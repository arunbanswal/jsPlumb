import { Offset, PointArray } from '../common';
import { JsPlumbInstance } from "../core";
import { EventGenerator } from "../event-generator";
import { AnchorId, AnchorOptions, AnchorOrientationHint, Orientation } from "../factory/anchor-factory";
import { AnchorPlacement } from "../router/router";
export declare class Anchor extends EventGenerator {
    instance: JsPlumbInstance;
    type: AnchorId;
    isDynamic: boolean;
    isContinuous: boolean;
    isFloating: boolean;
    cssClass: string;
    elementId: string;
    id: string;
    locked: boolean;
    offsets: [number, number];
    orientation: Orientation;
    x: number;
    y: number;
    timestamp: string;
    lastReturnValue: AnchorPlacement;
    _unrotatedOrientation: Orientation;
    positionFinder: (dropPosition: Offset, elPosition: Offset, elSize: PointArray, constructorParams: any) => any;
    clone: () => Anchor;
    constructor(instance: JsPlumbInstance, params?: AnchorOptions);
    shouldFireEvent(event: string, value: any, originalEvent?: Event): boolean;
    setPosition(x: number, y: number, ox: AnchorOrientationHint, oy: AnchorOrientationHint, overrideLock?: boolean): void;
    setInitialOrientation(ox: number, oy: number): void;
    equals(anchor: Anchor): boolean;
    getCssClass(): string;
    lock(): void;
    unlock(): void;
    isLocked(): boolean;
}
