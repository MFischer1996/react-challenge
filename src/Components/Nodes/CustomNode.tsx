import './CustomNode.css';
import {Handle, Position} from "react-flow-renderer";
import React from "react";

interface CustomNodeProps {
    showTopHandle?: boolean;
    showBottomHandle?: boolean;
    children: any;
    selected?: boolean;
    onDragStart?: (e: any) => void;
    color: string;
    draggable: boolean;
}

export interface CustomNodeChildProps {
    onDragStart?: (e: any) => void;
    showHandles?: boolean;
    selected?: boolean;
    data?: any;
    id?:string;
}

function CustomNode(props: CustomNodeProps) {
    return (
        <>
            {props.showTopHandle && <Handle type="target" position={Position.Top} />}
            <div className={`custom-node ${props.color} ${props.selected ? "custom-selected" : ""}`} onDragStart={props.onDragStart} draggable={props.draggable}>
                {props.children}
            </div>
            {props.showBottomHandle && <Handle type="source" position={Position.Bottom}  />}

        </>
    );
}

export default CustomNode;
