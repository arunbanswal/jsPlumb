
import {JsPlumbInstance} from "../core"
import {Dictionary} from '../common'

import {PaintStyle} from "../styles"
import {Component} from "../component/component"
import {uuid} from "../util"
import {EventGenerator} from "../event-generator"
import {Connection} from '../connector/connection-impl'
import * as Constants from "../constants"

export interface OverlayOptions extends Record<string, any> {
    id?:string
    cssClass?: string
    location?: number; // 0.5
    endpointLoc?:[number, number]
    events?:Dictionary<Function>
}

export interface ArrowOverlayOptions extends OverlayOptions {
    width?: number; // 20
    length?: number; // 20
    direction?: number; // 1
    foldback?: number; // 0.623
    paintStyle?: PaintStyle
}

export interface LabelOverlayOptions extends OverlayOptions {
    label: string
    endpointLocation?:[ number, number ]
    labelLocationAttribute?:string
}

export interface CustomOverlayOptions extends OverlayOptions {
    create:(c:Component) => any
}

export type OverlayId = "Label" | "Arrow" | "PlainArrow" | "Custom"

export type FullOverlaySpec = [OverlayId, OverlayOptions]
export type OverlaySpec = OverlayId | FullOverlaySpec

export abstract class Overlay extends EventGenerator {

    id:string
    abstract type:string

    cssClass:string

    visible:boolean = true
    location: number
    endpointLocation:[number, number]

    events?:Dictionary<Function>

    constructor(public instance:JsPlumbInstance, public component:Component, p:OverlayOptions) {
        super()
        p = p || {}
        this.id = p.id  || uuid()
        this.cssClass = p.cssClass || ""
        this.location = p.location || 0.5
        this.events = p.events || {}

        for (let event in this.events) {
            this.bind(event, this.events[event])
        }
    }

    shouldFireEvent(event: string, value: any, originalEvent?: Event): boolean {
        return true
    }

    setVisible(v: boolean): void {
        this.visible = v
        this.instance.renderer.setOverlayVisible(this, v)
    }

    isVisible(): boolean {
        return this.visible
    }

    destroy(force?: boolean): void {
        this.instance.renderer.destroyOverlay(this, force)
    }

    abstract updateFrom(d:any):void

    private _postComponentEvent(eventName:string, originalEvent:Event) {
        this.instance.fire(eventName, this.component, originalEvent)
    }

    click(e:Event) {
        this.fire(Constants.EVENT_CLICK, e)
        let eventName = this.component instanceof Connection ? Constants.EVENT_CLICK : Constants.EVENT_ENDPOINT_CLICK
        this._postComponentEvent(eventName, e)
    }

    dblClick(e:Event) {
        this.fire(Constants.EVENT_DBL_CLICK, e)
        let eventName = this.component instanceof Connection ? Constants.EVENT_DBL_CLICK : Constants.EVENT_ENDPOINT_DBL_CLICK
        this._postComponentEvent(eventName, e)
    }

}




