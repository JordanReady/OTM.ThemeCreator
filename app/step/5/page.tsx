import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Step 5: Deploy to Vercel</h1>
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
          href="/step/4"
        >
          Previous Step
        </Link>
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/about"
        >
          About
        </Link>
      </div>
      {/* Sub-step 1 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 1: Set up Vercel account and install CLI
        </h2>
        <p>Follow these steps to get ready for deployment:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Create a Vercel account if you don't have one.</li>
          <li>
            Install the Vercel CLI by running{" "}
            <code className="bg-slate-300">npm install -g vercel</code>.
          </li>
        </ol>
      </div>

      {/* Sub-step 2 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 2: Deploy to Vercel
        </h2>
        <p>Time to deploy your app to Vercel:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>
            Run <code className="bg-slate-300">vercel</code> in your project
            directory.
          </li>
          <li>
            If you run into any errors you may need to add environment variables
            to Vercel using the vercel dashboard.
          </li>
          <li>
            Go to your project in vercel and launch the app from the live
            domain. It should look something like this:{" "}
            <code className="bg-slate-300">your-app-name.vercel.app</code>
          </li>
        </ol>
      </div>

      {/* Sub-step 3 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 3: Update Google Cloud Console settings
        </h2>
        <p>
          Update Google Cloud Console settings to allow redirects from the
          Vercel deployment:
        </p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Try and Login on your deployed app</li>
          <li>
            You'll see Request details:{" "}
            <code>
              redirect_uri=
              <code className="bg-slate-300">
                https://yourapp.vercel.app/api/auth/callback/google
              </code>
            </code>{" "}
            Copy the uri and paste it in google cloud console
          </li>
          <li>Go to APIs & Services {">"} Credentials.</li>
          <li>Click on OAuth 2.0 Client IDs for your application.</li>
          <li>Add the Vercel deployment URI to authorized redirect URIs.</li>
          <li>
            You'll also need to add this URI to the Javascript origins:
            <code>
              {" "}
              redirect_uri=
              <code className="bg-slate-300">https://yourapp.vercel.app</code>
              /api/auth/callback/google
            </code>{" "}
          </li>
        </ol>
      </div>

      {/* Sub-step 4 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 4: Test the deployment
        </h2>
        <p>
          Go back to your application, try logging in, and verify that it's
          working properly on the live Vercel link.
        </p>
      </div>

      {/* Additional information or links */}
      <p className="mt-4">
        Note: If you decide to use a custom domain in the future, you'll need to
        repeat these steps.
      </p>
    </div>
  );
};

export default page;
