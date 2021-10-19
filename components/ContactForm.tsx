import { ReactElement } from "react";

//TODO only works on netlify with proper configuration.
export default function ContactForm(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Contact Us</h1>
      <form className="w-2/3 xl:w-1/3" name="contact" method="POST">
        {
          //bot protection
        }
        <input type="hidden" name="form-name" value="contact" />

        <div className="m-4">
          <label htmlFor="yourname" />
          <input
            className="w-full"
            type="text"
            name="name"
            id="yourname"
            placeholder="Your Name"
          />
        </div>

        <div className="m-4">
          <label htmlFor="yourphone" />
          <input
            className="w-full"
            type="tel"
            name="phone"
            id="yourphone"
            placeholder="Your Phone Number"
          />
        </div>

        <p className="m-4">
          <label htmlFor="youremail" />
          <input
            className="w-full"
            type="email"
            name="email"
            id="youremail"
            placeholder="Your Email"
          />
        </p>

        <p className="m-4">
          <label htmlFor="yourmessage" />
          <textarea
            className="w-full"
            name="message"
            id="yourmessage"
            placeholder="Your Message"
          ></textarea>
        </p>

        <p className="m-4">
          <button
            className="w-full bg-blue-400 dark:bg-violet-600"
            type="submit"
          >
            Send
          </button>
        </p>
      </form>
    </div>
  );
}
