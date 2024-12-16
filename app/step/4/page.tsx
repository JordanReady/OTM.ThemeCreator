import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Step 4: Customize and Develop Your App
      </h1>
      <div className="mb-4 flex gap-2">
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/"
        >
          Home
        </Link>
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/step/3"
        >
          Prev Step
        </Link>
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/step/5"
        >
          Next Step
        </Link>
      </div>

      <p className="text-lg mb-4">
        Congratulations on completing the initial setup! Now it's time to
        customize the starter files and start developing your Next.js app.
      </p>

      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">Clean Up Starter Files</h2>
        <p>
          The provided starter files are there to guide you. Feel free to clean
          up or remove files that were added for explanation purposes. You can
          delete routes or components that are not relevant to your project.
        </p>
      </div>

      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">Start Developing</h2>
        <p>
          Navigate to the <code className="bg-slate-300">app</code> directory to
          begin building your application. This directory is where you'll find
          the core components and structure of your Next.js app. Explore and
          modify files based on your project requirements.
        </p>
      </div>

      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">Helpful Tips</h2>
        <ol className="list-decimal pl-4 mt-2">
          <li>
            Delete all the hard work I painstakingly put into the{" "}
            <code className="bg-slate-300">page.tsx</code> file. This will
            effectivley act as your home page.
          </li>
          <li>
            Check out the <code className="bg-slate-300">middleware.ts</code>{" "}
            file to add protected routes. If an unauthorized user lands on a
            route they shouldn't, your app will make them login first!
          </li>

          <li>
            The <code className="bg-slate-300">about</code> folder,{" "}
            <code className="bg-slate-300">protected</code> folder, and the{" "}
            <code className="bg-slate-300">step</code> folder are there for
            demonstration purposes. Feel free to trash those too, or use them if
            you want! {"(You'll probably just trash them though...)"}
          </li>
          <li>
            Don't forget to tweak the metadata in the layout! Change your name
            and description.
          </li>
          <li>
            After you've given your code a fresh new look, I'd recommend
            deploying your app with Vercel before diving too deep into your
            development. Or, if you're feeling adventurous, add a bunch of files
            and packages, then spend an entire day debugging your deployment.
            Bonus points for committing changes with cryptic messages like
            "Fix??" or "This fix has to fix it!" or "Does this sh*t even work?".
            Just do yourself a favor and deploy early – thank me later.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default page;
