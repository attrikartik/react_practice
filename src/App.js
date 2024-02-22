
import react, { useEffect, useState } from 'react';
import DebounceThrottle from './debounceThrottle'
import explorData from './FileExplorer/data/folderData';
import Folder from './FileExplorer/components/folder'
import useTraverseTree from './FileExplorer/hooks/useTraverseTree';
function App() {

  /** ---------- This part is for File explorer practice --------------**/
   
   const [explorerData, setExplorerData] = useState(explorData);
   const {insertNode} = useTraverseTree()
   
   const handleAddFolderOrFile=(folderId,item,isFolder)=>{
     const finalTree = insertNode(explorerData,folderId,item,isFolder)
     setExplorerData(finalTree)
    }
    
  return(
    <div>
      {/*
        * ------------------ this for debounce and throttle practice ----------------
       <DebounceThrottle/> 
      */}

      {/* ------------- This for file explorer practice ------------ */}
            
      <Folder explorerData={explorerData} handleAddFolderOrFile={handleAddFolderOrFile}/>
       
    </div>
  )
}

export default App;