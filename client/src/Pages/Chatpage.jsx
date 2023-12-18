import { Box } from '@chakra-ui/layout';
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components//SideDrawer";
import { ChatState } from "../Context/ChatProvider";


const Chatpage = () => {


const { user } = ChatState();

  return (
    <div style={{width:"100%"}}>
      { user && <SideDrawer /> }
      <Box display="flex"  >
       { user && <MyChats />}
       { user && <Chatbox /> }
      </Box>
    </div>
  )
}

export default Chatpage;