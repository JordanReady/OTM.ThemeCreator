import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">About Me and the Starter Kit</h1>

      <p className="text-lg mb-4">
        Hello, I'm Jordan Ready, a software developer passionate about building
        efficient and scalable applications.
      </p>

      <p className="mb-4">
        I created this Next.js Auth/Firebase Starter Kit to help fellow
        developers kickstart their projects with a solid authentication and
        backend infrastructure. The kit provides a step-by-step guide for
        setting up Google Cloud, Firebase, environment files, and more, ensuring
        a smooth development experience.
      </p>

      <p className="mb-4">
        My goal is to share my knowledge and make the onboarding process for new
        projects as seamless as possible. Whether you're a beginner or an
        experienced developer, I hope this starter kit accelerates your journey
        in building amazing applications.
      </p>

      <p>
        If you have any questions, feedback, or suggestions, feel free to reach
        out. Happy coding!
      </p>
    </div>
  );
};

export default page;
