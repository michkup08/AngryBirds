import Matter, { Engine, World } from 'matter-js';
import { BodySnapshot, PhysicsUpdateCallback } from './types';


export default class PhysicsEngine{
    engine: Engine;
    world: World;
    width: number;
    height: number;
    onUpdate: PhysicsUpdateCallback | null = null;
    private _running = false;
    private _last = 0;

    constructor({width, height} : {width: number; height: number}){
        this.width = width; 
        this.height = height;
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
    }


    init(){
        const ground = Matter.Bodies.rectangle(this.width/2, this.height - 40, this.width, 80, {isStatic:true});
        Matter.World.add(this.world, [ground]);


        // sample bird
        const bird = Matter.Bodies.circle(120, this.height - 120, 18, {density:0.004});
        Matter.World.add(this.world, [bird]);


        this._running = true;
        this._last = Date.now();
        this._loop();
    }


    _loop(){
        if (!this._running) return;
        const now = Date.now();
        const dt = (now - this._last) / 1000;
        this._last = now;
        Engine.update(this.engine, dt * 1000);


        const bodies: BodySnapshot[] = this.world.bodies.map((b) => ({
            id: b.id,
            position: { x: b.position.x, y: b.position.y },
            angle: b.angle,
            label: b.label,
            circleRadius: (b as any).circleRadius ?? null,
            bounds: b.bounds,
        }));


        if (this.onUpdate) this.onUpdate(bodies);


        requestAnimationFrame(() => this._loop());
    }


    applyForceToBody(bodyId: number, force: { x: number; y: number}){
        const body = this.world.bodies.find(b=>b.id===bodyId);
        if(body) Matter.Body.applyForce(body, body.position, force);
    }


    destroy(){
        this._running = false;
        World.clear(this.world, false);
        Engine.clear(this.engine);
    }
}