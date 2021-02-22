import {EndpointSpec} from "./endpoint/endpoint"
import {AnchorSpec} from "./factory/anchor-factory"
import {PaintStyle} from "./styles"
import {OverlaySpec} from "./overlay/overlay"
import {ConnectorSpec} from "./connector/abstract-connector"

export interface ListSpec {
    endpoint?: EndpointSpec
}

export interface jsPlumbDefaults<E> {
    endpoint?: EndpointSpec
    endpoints?: [ EndpointSpec, EndpointSpec ]
    anchor?: AnchorSpec
    anchors?: [ AnchorSpec, AnchorSpec ]
    paintStyle?: PaintStyle
    hoverPaintStyle?: PaintStyle

    endpointStyle?: PaintStyle
    endpointHoverStyle?: PaintStyle
    endpointStyles?: [ PaintStyle, PaintStyle ]
    endpointHoverStyles?: [ PaintStyle, PaintStyle ],

    connectionsDetachable?: boolean
    reattachConnections?: boolean

    endpointOverlays?: Array<OverlaySpec>
    connectionOverlays?: Array<OverlaySpec>

    listStyle?: ListSpec

    container?: E
    connector?:ConnectorSpec
    scope?:string

    maxConnections?:number

    hoverClass?:string

    allowNestedGroups?:boolean
}

