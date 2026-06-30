
// 0. OUR LOW-LEVEL TYPE EXTRACTOR DEFINITION

// Refactored to target native JS structures:
type componentProps<T> = T extends
  | ((props: infer Props) => any) // Matches any regular functional architecture
  | (new (props: infer Props) => any) // Matches any Class constructor blueprint
  ? Props
  : never;

// SCENARIO 1: EXTRACTING FROM A FUNCTION

console.log(`Imagine this configuration profile is imported from a 3rd party package,
and they forgot to export the "UserProfileProps" type!`);

type UserProfileProps = {
  userId: string;
  isAdmin: boolean;
  theme: "light" | "dark";
};

// Pure function replacing the React component
const renderUserProfile = (props: UserProfileProps): string => {
  return `<div>User: ${props.userId}</div>`;
};

// Use our utility to extract the hidden argument type
type ExtractedUserProps = componentProps<typeof renderUserProfile>;

// Reusing that type to safely construct new data structures
const activeAdminUser: ExtractedUserProps = {
  userId: "usr_9901",
  isAdmin: true,
  theme: "dark",
};

// Note: TypeScript does not support runtime type evaluation via `extends`.
// To assert type structural equivalence cleanly, we assign it directly:
// 1. A utility type that forces a compilation error if the condition isn't met
type AssertTrue<T extends true> = T;

// 2. This will compile perfectly because ExtractedUserProps extends UserProfileProps
type Test = AssertTrue<ExtractedUserProps extends UserProfileProps ? true : false>;

// 3. Safe to log since the type checker cleared the lines above
console.log(
  "Yes, we successfully extracted the type shape of UserProfileProps.\n",
  activeAdminUser,
);

// SCENARIO 2: EXTRACTING FROM A LEGACY CLASS

// Standard ES6 class constructor signature matching our Class conditional check
class LegacyButton {
  props: { label: string; onClick: () => void };

  constructor(props: { label: string; onClick: () => void }) {
    this.props = props;
  }

  render() {
    return `<button onclick="${this.props.onClick}">${this.props.label}</button>`;
  }
}

// Extract the configuration props from the class blueprint directly
type LegacyButtonProps = componentProps<typeof LegacyButton>;

const customButtonConfig: LegacyButtonProps = {
  label: "Click Me",
  onClick: () => console.log("Clicked!"),
};

// SCENARIO 3: CREATING A PROXY WRAPPER

type TrackedProfileProps = componentProps<typeof renderUserProfile> & {
  analyticsEventName: string;
};

const trackedRenderUserProfile = ({
  analyticsEventName,
  ...profileProps
}: TrackedProfileProps): string => {
  // 1. Simulate telemetry processing
  console.log(
    `Tracking: ${analyticsEventName} for user ${profileProps.userId}`,
  );

  // 2. Safely spread the extracted properties right into the base function execution
  return renderUserProfile(profileProps);
};

// SCENARIO 4: THE SAFETY NET (THE "NEVER" BRANCH)

type FailedExtraction = componentProps<string>; // Evaluates to: never

// @ts-expect-error - Expected error because assigning data to 'never' is illegal.
const badData: FailedExtraction = { hello: "world" };
