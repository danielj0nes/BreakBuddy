//I've created a simple Linkedlist to use so I can change images

class LinkedList {
    constructor(head = null) {
        this.head = head
        actual = null
    }
}

class node {
    value = null
    next = null
    previous = null
}

function getvalue(node){
    return node.value
}


let node1 = new node
node1.value ="images/bart.png"
let node2 = new node
node2.value = "images/homer.png"
let node3 = new node
node3.value = "images/Lisa.png"
node1.next = node2
node1.previous = node3
node2.next = node3
node2.previous = node1
node3.next = node1
node3.previous = node2
actual = node3

document.getElementById('pr').addEventListener('click', nextImage);
document.getElementById('nr').addEventListener('click', previousImage);

function nextImage() {
    const img = document.getElementById("imagen");
    actual = actual.next;
    img.src = actual.value;
}

function previousImage() {
    const img = document.getElementById("imagen");
    actual = actual.previous;
    img.src = actual.value;
}