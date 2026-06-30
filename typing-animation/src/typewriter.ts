type QueueItem = () => Promise<void>; // This is a function that returns a Promise of type void

export default class Typewriter {
  #queue: QueueItem[] = [];
  #element: HTMLElement;
  #loop: boolean;
  #typingSpeed: number;
  #deletingSpeed: number;

  constructor(
    typeWriterElement: HTMLElement, // this will act as the parent object for displaying all the typeWriter animations
    { loop = false, typingSpeed = 50, deletingSpeed = 50 },
  ) {
    this.#element = document.createElement("div"); // Used as the string element on which we will perform the animations
    this.#element.classList.add("whitespace");
    typeWriterElement.append(this.#element);
    this.#loop = loop;
    this.#typingSpeed = typingSpeed;
    this.#deletingSpeed = deletingSpeed;
  }

  // The idea behind making this typewriter obj is to store all the chained actions in a #queue array to be ran over and over
  typeString(string: string = "This is a TypeWriting Animation effect") {
    this.#addtoQueue((resolve) => {
      // Add functionality to be simulated by typeString function
      let charCount = 0;
      const typingInterval = setInterval(() => {
        if (charCount >= string.length) {
          clearInterval(typingInterval);
          resolve();
          return; // given so that no 'undefined' chars are got on Out-Of-Bound-Indexing 
        }
        const ch = string.charAt(charCount);
        this.#element.append(ch);
        charCount++;
      }, this.#typingSpeed);
    });
    return this;
  }

  deleteChars(number: number) {
    this.#addtoQueue((resolve) => {
      let deleted = 0;
      const typingInterval = setInterval(() => {
        const str = this.#element.innerText;
        if (!str || str.length === 0) {
          clearInterval(typingInterval);
          resolve();
          return;
        }
        this.#element.innerText = str.substring(0, str.length - 1);
        deleted++;
        if (deleted >= number) {
          clearInterval(typingInterval);
          resolve();
        }
      }, this.#deletingSpeed);
    });
    return this;
  }

  deleteAll(deleteSpeed: number = this.#deletingSpeed) {
    this.#addtoQueue((resolve) => {
      // let stringEnd = this.element.innerText.length;
      const typingInterval = setInterval(() => {
        const str = this.#element.innerText;
        if (!str || str.length === 0) {
          clearInterval(typingInterval);
          resolve();
          return;
        }
        this.#element.innerText = str.substring(0, str.length - 1);
      }, deleteSpeed);
    });

    return this;
  }

  pauseFor(duration: number = 0) {
    this.#addtoQueue((resolve) => {
      setTimeout(() => {
        console.log("Paused...");
        resolve();
      }, duration);
    });
    return this;
  }

  async start() 
  {
    // In this function, we finally retrive each action in the #queue and simulate it in a loop
    if (!this.#loop) {
      for (const callBack of this.#queue)
        await callBack();
    } 
    else {
      // When looping, run the queue repeatedly without mutating it
      do {
        for (const callBack of this.#queue)
          await callBack();
      } while (this.#loop);
    }
    
    return this;
  }

  // Private Helper Function to enqueue all the elements into the Queue
  #addtoQueue(
    callBack: (
      resolve: () => void, // resolve is a function that returns nothing
    ) => void, // callBack is a function that returns a Promise.resolve object
  ) {
    this.#queue.push(() => {
      return new Promise(callBack);
    });
  }
}
