import DateParser from "./date.parser";

/**
 * Implements video archive api
 * @public
 * @class
 */

export default class VideoArchiveAPI {

    /**
     * The class constructor
     */
    constructor(){
        /**
         * Root of all api endpoints
         */
        this.API_ROOT = "http://shavenzov.com:8000/asip-api";
    }

    /**
     * Requests all accessible origins
     * @public
     * @returns {Promise<Object>}
     */
    getVideoOrigins(){
        return fetch( `${this.API_ROOT}/video-origins/` ).then( response => response.json() ).then( data => { const videoOrigins = [];

            for( let originName in data ) {
                videoOrigins.push( data[ originName ] );
            }

            return videoOrigins; 
        }
       );
    }

    /**
     * Requests frame shot for startTime
     * @public
     * @param {string} origin - three component identifier (HOSTNAME/ObjectType.Id/Endpoint.Name) 
     * @param {Date} startTime - the date for which you need to get a shot
     * @returns {Promise<Blob>} 
     */
    getMedia( origin, startTime ){
        return fetch( `${this.API_ROOT}/archive/media/${origin}/${DateParser.serialize(startTime)}` ).then( data => data.blob() );
    }

    /**
     * Запрашивает информацию о глубине архива
     * @param {string} origin - трехкомпонентный идентификатор endpoint-а источника (HOSTNAME/ObjectType.Id/Endpoint.Name) 
     */
    /* getArchiveDepth( origin ){
        return fetch( `${this.API_ROOT}/archive/statistics/depth/${origin}` ).then( response => response.json() )
                        .then( data => { console.log( data ); return  { start: DateParser.deserialize( data.start ),
                                                   end: DateParser.deserialize( data.end ) } } );
    } */

    /**
     * Получение времени регистрации кадров, находящихся в архиве
     * @param {string} origin 
     * @param {Date} startTime 
     * @param {Date} endTime 
     * @param {number} limit 
     */
    /* getFrames( origin, startTime, endTime, limit = null ){
        
        let uri = `${this.API_ROOT}/archive/contents/frames/${origin}/${DateParser.serialize(endTime)}/${DateParser.serialize(startTime)}`;

        if ( limit != null ){
            uri += '?limit=' + limit;
        }

        return fetch( uri ).then( response => response.json() )
                           .then( data => {
                               return { ...data, frames: data.frames.map( date => DateParser.deserialize( date ) ) }
                           } );
    } */

}