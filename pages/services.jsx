import withLayout from '../HOC/withLayout';

function services() {
  return <div className='container mx-auto flex items-center justify-center w-full my-5'>
    <ol class="list-decimal">
      <li>Website prototype with Figma</li>
      <li>Website front-end development (Vanilla JavaScript, React.js, Next.js, Vue.js)</li>
      <li>Website backend-end development (Django, FastAPI, Node.js, Nest.js)</li>
      <li>WebAPI (WebRTC, Websocket, Web Workers, etc)</li>
      <li>API Development (RestAPI, GraphQL, Monolothinc, Microservices)</li>
      <li>API Integration (Discord, google api, etc)</li>
      <li>Database Management(MongoDB, MySQL, PostgresSQL, DynomoDB, Firebase, etc)</li>
      <li>Website scrapping (Python or Node.js)</li>
      <li>Chrome Extension development</li>
      <li>Website Hosting, server administration (Linux, Windows)</li>
      <li>DevOps (Docker, Kubernetes, Github action, CI, CD, jenkins)</li>
    </ol>
  </div>;
}

export default withLayout(services);
