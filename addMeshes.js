import { BoxGeometry, MeshBasicMaterial, MeshStandardMaterial, Mesh, SphereGeometry } from "three";

export const addBoilerPlateMeshes = ()=>{
    const box = new BoxGeometry(1,1,1)
    const boxMaterial = new MeshStandardMaterial({color: 0xff00ff})

    const boxMesh = new Mesh(box, boxMaterial)

    boxMesh.position.set(-2,0,0)

    return boxMesh
}


export const addStandardMesh = ()=>{
    const box = new BoxGeometry(1)
    const boxMaterial = new MeshStandardMaterial({color:0xffff00})

    const boxMesh = new Mesh(box, boxMaterial)
    boxMesh.position.set(2,0,0)
    

    return boxMesh
}

export const addSphere = ()=>{
    const sphere = new SphereGeometry(1)
    const sphereMaterial = new MeshStandardMaterial({color:0x00ffff})

    const sphereMesh = new Mesh(sphere, sphereMaterial)
    sphereMesh.position.set(0,0,0)

    return sphereMesh
}