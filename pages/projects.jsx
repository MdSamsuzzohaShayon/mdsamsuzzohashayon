import withLayout from "../HOC/withLayout";

function projects() {
  return <div className="container mx-auto flex items-center justify-center w-full my-5">
    <ol className="list-decimal">
      <li>Marketplace(MERN Stack) https://kinoverse.net/</li>
      <li>Sports blog(Wordpress) https://itssportstime.org</li>
      <li>Asset consulting(MERN Stack) https://dabasvcs.com/</li>
      <li>Financial website for saving(PHP) stockvell.allinone-office.com</li>
      <li>Cost Calculation (FastAPI, Vanilla JavaScript) - https://costcalc.netlify.app</li>
      <li>Email Template Building (MERN Stack) - https://www.youtube.com/watch?v=0bWAxfXdrHg</li>
      <li>LMS (Nodejs, MySQL, Sequelize, Nextjs) - www.ponditi.com</li>
      <li>Event Booking (MERN Stack, GraphQL) - https://www.youtube.com/watch?v=kNK_XnImUxM&t=1s</li>
    </ol>
  </div>;
}

export default withLayout(projects);
