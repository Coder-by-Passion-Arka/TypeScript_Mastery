import fs from "fs";
import path from "path";
import { Project, SyntaxKind } from "ts-morph";

const root = process.cwd();
const srcPath = path.resolve(root, "src/models/pets.ts");
const outDir = path.resolve(root, "generated");
const outFile = path.join(outDir, "expectedPetShape.json");

const project = new Project({
  tsConfigFilePath: path.resolve(root, "tsconfig.json"),
});
const sf =
  project.getSourceFile(srcPath) || project.addSourceFileAtPath(srcPath);
const cls = sf.getClassOrThrow("Pet");

function extractTypeLiteral(typeNode) {
  const result = {};
  if (!typeNode) return result;
  const members = typeNode.getMembers ? typeNode.getMembers() : [];
  for (const m of members) {
    const name = m.getName && m.getName();
    if (!name) continue;
    try {
      result[name] = m.getType
        ? m.getType().getText()
        : m.getType && m.getType().getText
          ? m.getType().getText()
          : "unknown";
    } catch (e) {
      try {
        result[name] = m.getTypeNode ? m.getTypeNode().getText() : "unknown";
      } catch (err) {
        result[name] = "unknown";
      }
    }
  }
  return result;
}

const shape = {};
for (const prop of cls.getInstanceProperties()) {
  if (prop.getKind() !== SyntaxKind.PropertyDeclaration) continue;
  const name = prop.getName();
  const type = prop.getType();
  const text = type.getText();

  // If the type is a named type that points to a type literal in the same file, expand it
  if (text === "MedicalRecordProps") {
    const alias = sf.getTypeAlias("MedicalRecordProps");
    if (alias) {
      const typeNode = alias.getTypeNode();
      shape[name] = extractTypeLiteral(typeNode);
      continue;
    }
  }

  shape[name] = text;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(shape, null, 2), "utf8");
console.log("Wrote", outFile);
