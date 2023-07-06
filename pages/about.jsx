import withLayout from '../HOC/withLayout';

function about() {
  return <div className='container mx-auto flex items-center justify-center w-full my-5'>
  <ol class="list-decimal">
    <li>Github: https://github.com/MdSamsuzzohaShayon</li>
    <li>Stackoverflow: https://stackoverflow.com/users/12281325/md-shayon</li>
    <li>Twitter: https://twitter.com/shayon_md</li>
  </ol>
</div>;
}

export default withLayout(about);
