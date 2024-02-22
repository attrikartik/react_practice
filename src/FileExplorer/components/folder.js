import React, { useState } from 'react'
import  './folder.css'
const Folder = ({handleAddFolderOrFile,explorerData}) => {

    // console.log(explorerData)
    const [expand, setExpand]=useState(false)
    const [showInput,setShowInput] = useState({visible:false,isFolder:null})

    const handleNewFolderAndFile = (e,isFolder)=>{
        e.stopPropagation()
        setShowInput({
            visible:true,
            isFolder
        })
        setExpand(true)
    }

    const onAddNewFolder =(e)=>{
       if(e.keyCode===13&& e.target.value){
        handleAddFolderOrFile(explorerData.id,e.target.value,showInput.isFolder)
        setShowInput({...showInput,visible:false})
       }
    }
    return (
        <>
        {
            explorerData.isFolder?
                <div style={{marginLeft:'50px'}}>
                    <div className="folder" onClick={()=>setExpand(!expand)}>
                        <span>
                            <i className="fas fa-folder"/>   
                            {"    " +explorerData.name}
                        </span>
                        <div>
                            <button onClick={(e)=>handleNewFolderAndFile(e,true)}>Folder +</button>
                            <button onClick={(e)=>handleNewFolderAndFile(e,false)}>File +</button>
                        </div>
                    </div>

                    <div style={{display:expand?'block':'none', paddingLeft:'20px'}}>
                        {
                            
                            showInput?.visible&&(
                        <div className='inputContainer'>
                            <span>{
                                    showInput?.isFolder?
                                    <i className="fas fa-folder"/>:<i className="fas fa-file"/>
                                }
                            </span>
                            <input 
                            type='text'
                            autoFocus
                            className='inputContainer_input'
                            onBlur={()=>setShowInput({...showInput,visible:false})}
                            onKeyDown={onAddNewFolder}
                            />
                            
                        </div>
                        )}
                        {explorerData?.items.map(i=>{
                            return(
                                <Folder handleAddFolderOrFile={handleAddFolderOrFile} explorerData={i} key={i.id}/>
                            )
                        })}
                    </div>
                </div>
            :<span className="file"><i className="fas fa-file"/>{explorerData?.name}</span>
        }
        </>
    
  )
}

export default Folder

