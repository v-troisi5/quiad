import { Node } from "tree/models/Node";

export function bfs(userNode: Node, tree: Node[]) {
    const explored = [userNode];
    const queue = [];
    queue.push(userNode);
    while(queue.length) {
        const v = queue.shift();
        if(v?.fatherId) {
            if(!explored.find(n => n.id == v?.fatherId)) {
                const father: any = tree.find(n => n.id == v?.fatherId);
                queue.push(father);
                if(father) explored.push(father);
            }
        }
        if(v?.motherId) {
            if(!explored.find(n => n.id == v?.motherId)) {
                const mother: any = tree.find(n => n.id == v?.motherId);
                queue.push(mother);
                if(mother) explored.push(mother);
            }
        }
        if(v?.motherHasChildren) {
            for(const node of  v.motherHasChildren) {
                if(!explored.find(n => n.id == node?.id)) {
                    const child: any = tree.find(n => n.id == node.id);
                    queue.push(child);
                    if(child) explored.push(child);
                }
            }
        }
        if(v?.fatherHasChildren) {
            for(const node of  v.fatherHasChildren) {
                if(!explored.find(n => n.id == node?.id)) {
                    const child: any = tree.find(n => n.id == node.id);
                    queue.push(child);
                    if(child) explored.push(child);
                }
            }
        }
    }
    return explored;
}