//ADD REEQUIRE

class task {
    constructor (name , size){
         this.name = name;
         this.size = size;
         this.subtask = [];
    }
    
    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }
}

model.exports = task;