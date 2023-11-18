AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var position1=new THREE.Vector3()
            var position2=new THREE.Vector3()
            var enemey=els[i].object3d
            var player=document.querySelector("#weapon").object3d
            player.getWorldPosition(position1)
            enemey.getWorldPosition(position2)
            var direction=new THREE.Vector3()
            direction.subVectors(position1,position2).normalize()
            enemyBullet.setAttribute("velocity",direction.multiplyScalar(10))
            enemyBullet.setAttribute("dynamic-body",{shape:"sphere",mass:"0"})
            var element=document.querySelector("#countLife")
            var playerLife=parseInt(element.getAttribute("text").value)
            

            //Get enemey and player position using Three.js methods
            

            //set the velocity and it's direction
            
            //Set dynamic-body attribute
            

            //Get text attribute
            

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if (playerLife>0){
                        playerLife-=1
                        element.setAttribute("text",{value:playerLife})
                    }
                    if (playerLife<=0){
                        var text=document.querySelector("#over")
                        text.setAttribute("visible",true)
                        var tankEl=document.querySelectorAll(".enemy")
                        for (let i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i])
                            
                        }

                    }



                }
            });

        }
    },

});