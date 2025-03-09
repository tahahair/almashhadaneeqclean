declare namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element, options?: MapOptions);
        setCenter(latLng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getZoom(): number;
      }
  
      class Marker {
        constructor(opts?: MarkerOptions);
      }
  
      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }
  
      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        disableDefaultUI?: boolean;
        zoomControl?: boolean;
        streetViewControl?: boolean;
        mapTypeControl?: boolean;
        fullscreenControl?: boolean;
        styles?: any[];
      }
  
      interface MarkerOptions {
        position: LatLng | LatLngLiteral;
        map: Map;
        icon?: string | Icon | Symbol;
      }
  
      interface LatLngLiteral {
        lat: number;
        lng: number;
      }
  
      interface Icon {
        url?: string;
        size?: Size;
        origin?: Point;
        anchor?: Point;
        scaledSize?: Size;
      }
  
      interface Symbol {
        path: SymbolPath | string;
        fillColor?: string;
        fillOpacity?: number;
        scale?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
      }
  
      enum SymbolPath {
        BACKWARD_CLOSED_ARROW,
        BACKWARD_OPEN_ARROW,
        CIRCLE,
        FORWARD_CLOSED_ARROW,
        FORWARD_OPEN_ARROW
      }
  
      class Size {
        constructor(width: number, height: number);
      }
  
      class Point {
        constructor(x: number, y: number);
      }
  
      namespace places {
        class SearchBox {
          constructor(inputField: HTMLInputElement, opts?: SearchBoxOptions);
          getPlaces(): Place[];
          addListener(eventName: string, handler: Function): void;
        }
  
        interface SearchBoxOptions {
          bounds?: LatLngBounds;
        }
  
        interface Place {
          geometry?: {
            location?: LatLng;
          };
        }
  
        class PlacesService {
          constructor(attrContainer: HTMLDivElement | Map);
        }
  
        interface PlaceResult {
          name?: string;
          formatted_address?: string;
        }
      }
  
      class LatLngBounds {
        constructor(sw?: LatLng, ne?: LatLng);
        extend(point: LatLng): LatLngBounds;
      }
    }
  }