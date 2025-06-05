let tasks=[];

export const getAllTasks=(req,res)=>{
    try{
        res.status(200).json(tasks);
    }
    catch(error){
        console.log("Error in getAllTasks function of tasks controller",error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createNewTask=(req,res)=>{
    const {title,description}=req.body;
    if(!title || !description) return res.status(400).json({ message:"Title and description both are required!" });
    try{
        const newTask={
            id:tasks.length+1,
            title:title,
            description:description
        }
        tasks.push(newTask);
        res.status(200).json({ message:"New task created successfully! "});
    }
    catch(error){
        console.log("Error in createNewTask function of tasks controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const getTaskById=(req,res)=>{
    const id=parseInt(req.params.id);
    try{
        const reqTask=tasks.find(item=>item.id===id);
        if(!reqTask) return res.status(404).json({ message:"Requested Task not found!" });
        res.status(200).json(reqTask);
    }
    catch(error){
        console.log("Error in getTaskById function of tasks controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const updateTask=(req,res)=>{
    const {title,description}=req.body;
    if(!title || !description) return res.status(400).json({ message:"Title and description are required!" });
    const id=parseInt(req.params.id);
    try{
        const reqTask=tasks.find(item=>item.id===id);
        if(!reqTask) return res.status(404).json({ message:"Required Task not found "});
        reqTask.title=title;
        reqTask.description=description;
        res.status(200).json({ message:"Task Updated Successfully! "});
    }
    catch(error){
        console.log("Error in getTaskById function of tasks controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const deleteReqTask=(req,res)=>{
    const id=parseInt(req.params.id);
    try{
        const reqTask=tasks.findIndex(item=>item.id===id);
        if(reqTask===-1) return res.status(404).json({ message:"Required task not found! "});
        tasks.splice(reqTask,1);
        res.status(200).json({ message:"Task removed successfully! "});
    }
    catch(error){
        console.log("Error in deleteReqTask function of tasks controller", error.message);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}