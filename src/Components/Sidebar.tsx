import './Sidebar.css';
import React from "react";
import AuthorNode from "./Nodes/AuthorNode";
import QANode from "./Nodes/QANode";
import PauseNode from "./Nodes/PauseNode";
import EndNode from "./Nodes/EndNode";
import StartNode from "./Nodes/StartNode";

function Sidebar() {
    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/x', event.clientX - event.target.getBoundingClientRect().left);
        event.dataTransfer.setData('application/y', event.clientY - event.target.getBoundingClientRect().top);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="sidebar flex justify-center w-64 h-full bg-blue-100 text-center">
            <aside>
                <span className="font-bold">Elements</span>
                <StartNode id="startnode" onDragStart={(event) => onDragStart(event, 'startNode')} showHandles={false}/>
                <AuthorNode id="authornode" onDragStart={(event) => onDragStart(event, 'authorNode')} showHandles={false}/>
                <QANode id="qanode" onDragStart={(event) => onDragStart(event, 'qaNode')} showHandles={false}/>
                <PauseNode id="pausenode" onDragStart={(event) => onDragStart(event, 'pauseNode')} showHandles={false}/>
                <EndNode id="endnode" onDragStart={(event) => onDragStart(event, 'endNode')} showHandles={false}/>
            </aside>
        </div>
    );
}

export default Sidebar;
