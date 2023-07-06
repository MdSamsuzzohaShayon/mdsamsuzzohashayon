import withLayout from '../HOC/withLayout';

function contact() {
  return <div className='container mx-auto flex items-center justify-center w-full my-5'>
    <ol class="list-decimal">
      <li>Whatsapp: +8801785208590</li>
      <li>Email: mdsamsuzzoha5222@gmail.com</li>
    </ol>
  </div>;
}

export default withLayout(contact);
