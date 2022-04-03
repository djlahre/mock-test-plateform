import React from "react";

export default function About() {
  return (
    <>
      <div className="card">
        <div className="card-body" style={{ textAlign: "justify" }}>
          <h4>About Us</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            animi perferendis nobis recusandae incidunt, dolorum tempora magnam
            placeat, exercitationem, iure nam? Ratione eos nisi porro
            perferendis pariatur vel inventore fugit.
          </p>

          <h4>Vision</h4>
          <div>
            <span className="fw-bold fst-italic">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor,
              est.
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              sapiente quisquam laboriosam natus libero sit perferendis iure
              illo veritatis eveniet!
            </p>
          </div>

          <h4>Goal</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit
            dolores deserunt magnam enim quisquam recusandae iste aperiam, eos
            ipsa, doloremque debitis eum. Nisi nihil numquam dolorum excepturi
            amet quae fuga totam laudantium sed adipisci, exercitationem, nam
            libero esse reprehenderit et odit praesentium, sit iste! Incidunt
            totam dolor qui reiciendis iusto?
          </p>
          <hr />
          <h6 className="text-center">
            <a href="mailto:mtp@host.com">Contact Us</a>
          </h6>
        </div>
      </div>
    </>
  );
}
