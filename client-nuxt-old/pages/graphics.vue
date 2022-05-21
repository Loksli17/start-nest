<script setup lang="ts">
    import * as PIXI from "pixi.js";

    const container = ref(null as null | HTMLDivElement);

    onMounted(() => {
        const app = new PIXI.Application({ width: 640, height: 480 });
        
        (container.value!).appendChild(app.view);


        let startingPos: null | any = null;
        let dragFlag = false;

        app.renderer.plugins.interaction.on("mousedown", (e: PIXI.InteractionEvent) => {
            // console.log(e)
            if (e.data.button !== 1) return;
            dragFlag = true;

            startingPos = {
                x: e.data.global.x,
                y: e.data.global.y
            }
        });

        app.renderer.plugins.interaction.on("mousemove", (e: PIXI.InteractionEvent) => {
            if (!dragFlag) return;

            const
                dx = e.data.global.x - startingPos.x,
                dy = e.data.global.y - startingPos.y;

            app.stage.position.x += dx;
            app.stage.position.y += dy;

            startingPos = {
                x: e.data.global.x,
                y: e.data.global.y
            }
        });

        app.renderer.plugins.interaction.on("mouseup", () => {
            dragFlag = false;
        });


        const boundingRect = new PIXI.Graphics();

        const rect = new PIXI.Graphics();
        rect.interactive = true;
        rect.buttonMode = true;
        
        rect.beginFill(0xFF0000);
        rect.drawRect(50, 50, 100, 100);

        rect.on("pointerover", e => {
            const bounds = rect.getBounds();

            boundingRect.lineStyle(2, 0xFEEB77, 1);
            boundingRect.drawRect(
                rect.position.x,
                rect.position.y,
                bounds.width,
                bounds.height
            );

            rect.tint = 0x666666;
            rect.addChild(boundingRect);
        });

        rect.on("pointerout", e => {
            boundingRect.clear();
            rect.removeChild(boundingRect);
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

        const curve = new PIXI.Graphics();
        curve.interactive = true;
        curve.buttonMode = true;

        curve.lineStyle(10, 0xFEEB77, 1);
        curve.moveTo(100, 100);
        curve.bezierCurveTo(110, 50, 150, 50, 170, 100);
        

        curve.on("pointerenter", e => {
            // curve.tint = 0xFFFFFF;
            console.log(e)
        });

        curve.on("pointerout", e => {
            // curve.tint = 0xFFFFFF;
            boundingRect.clear();
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