<script setup lang="ts">
    import * as PIXI from "pixi.js";

    const container = ref(null as null | HTMLDivElement);

    onMounted(() => {
        const app = new PIXI.Application({ width: 640, height: 480 });
        
        (container.value!).appendChild(app.view);

        const rect = new PIXI.Graphics();
        rect.interactive = true;
        rect.buttonMode = true;
        
        rect.beginFill(0xFF0000);
        rect.drawRect(50, 50, 100, 100);

        

        rect.on("pointerover", e => {
            rect.tint = 0x666666;
        });

        rect.on("pointerout", e => {
            rect.tint = 0xFFFFFF;
        });

        
        // ! PIXI.js docs say to use 'this' in here,
        // ! yet TS complains about 'this' being weird,
        // ! so we're doing this the Python way
        rect
            .on("pointerdown", function (this: any, event) {
                this.data = event.data;
                this.dragging = true;
            })
            .on("pointermove", function (this: any) {
                if (this.dragging) {
                    const newPos = this.data.getLocalPosition(this.parent);
                    this.x = newPos.x - 100;
                    this.y = newPos.y - 100;
                }
            })
            .on("pointerup", function (this: any) {
                this.dragging = false;
                this.data = null;
            })
            .on("pointerupoutside", function (this: any) {
                this.alpha = 1;
                this.dragging = false;
                this.data = null;
            });

        app.stage.addChild(rect);
    });

    
</script>

<template>
    <div>
        <div ref="container"></div>
        <CustomLink to="/">home</CustomLink>
    </div>
</template>