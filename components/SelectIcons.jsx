import { FcAbout } from 'react-icons/fc';
import { FaHome } from 'react-icons/fa';
import { AiFillProject, AiFillContacts} from 'react-icons/ai';
import { GrServices } from 'react-icons/gr';
import { BsMenuButtonFill } from 'react-icons/bs';

/* eslint-disable react/prop-types */
function SelectIcons({ selectedItem }) {
//   console.log({ selectedItem });
  //   if (!selectedItem) return;
  switch (selectedItem) {
    case 'AiFillHome':
      return <FaHome />;
    case 'FcAbout':
      //   console.log('About');
      return <FcAbout />;
    case 'AiFillContacts':
      //   console.log('Contact');
      return <AiFillContacts />;
    case 'AiFillProject':
    //   console.log('Project');
      return <AiFillProject />;
    case 'GrServices':
    //   console.log('Service');
      return <GrServices />;
    case 'BsMenuButtonFill':
    //   console.log('Menu');
      return <BsMenuButtonFill />;
    default:
    //   console.log('Default');
      return <FaHome />;
  }
}

export default SelectIcons;
