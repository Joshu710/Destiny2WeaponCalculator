import "./css/About.css";

function About() {
  return (
    <div className="d-flex w-100 justify-content-center align-content-center">
      <div className="w-50 d-flex flex-column justify-content-center text-center">
        <h1>About</h1>

        <body>
          <p>
            Our project is a Destiny 2 weapon perk selector that tells users how much
            damage they can do to the different enemy types that exist in Destiny 2. Each weapon in
            Destiny 2 has five columns of perks, with four of the columns being able to roll with six or
            more perks. Our application will allow users to pick and choose specific perk
            combinations to see how the perks they select will change the amount of damage output
            they can do. This will tell them the optimal perk combinations for maximum damage so
            that they know which weapon rolls to keep or discard in-game.
          </p>
          <h3>
            Inspirations
          </h3>
          <p>
          We took inspiration from multiple existing websites that allow players to view and/or craft
          their own weapon perk combinations:
            <div>
              <ul>
                <li>Foundry: <a className="" href="https://d2foundry.gg/" target="_blank">https://d2foundry.gg/</a></li>
                <li>Destiny Item Manager (DIM): <a className="" href="https://destinyitemmanager.com/" target="_blank">https://destinyitemmanager.com/</a></li>
                <li>D2 Arsenal: <a className="" href="https://www.d2arsenal.com/" target="_blank">https://www.d2arsenal.com/</a></li>
                <li>light.gg: <a className="" href="https://www.light.gg/" target="_blank">https://www.light.gg/</a></li>
              </ul>
            </div>
          </p>

          <h3>
            Created by: Joshua Bernal, Zachary Ervin, and Tyler Kash
          </h3>
        </body>
      </div>
    </div>
  );
}

export default About;
