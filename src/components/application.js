import VideoArchiveViewer from './video.archive.viewer/video.archive.viewer';
import CameraChooser from './camera.chooser/camera.chooser';
import VideoArchiveAPI from '../services/video.archive.api';
import DateParser from '../services/date.parser';

/**
 * Application component implementation
 * @public
 * @class
 */
export default class Application{

    /**
     * The class constructor
     */
    constructor(){ 
        
        //interval between frames in ms
        this.FRAME_INTERVAL = 60000; //1 min
        
        //num of requested frames
        this.NUM_REQUESTED_FRAMES = 30;

        this.chooser = new CameraChooser( "camera-chooser" );
        this.chooser.camerachanged = ( originId ) => this.onCameraChanged( originId );

        this.viewer = new VideoArchiveViewer( "video-archive-viewer" );
        this.viewer.onleftlimitreached = ( frame_id ) => this.onLeftLimitReached( frame_id );
        this.viewer.onrightlimitreached = ( frame_id ) => this.onRightLimitReached( frame_id );

        /**
         * List of all video origins
         */
        this.videoOrigins = [];

        /**
         * Selected video origin
         */
        this.selectedOrigin = null;

        /**
         * Flag indicates that new frames is loading now
         */
        this.pending = false;

        this.api = new VideoArchiveAPI();

        /**
         * Requesting video origins
         */
        this.api.getVideoOrigins().then( ( data ) => {
            this.videoOrigins = data.slice();
            this.chooser.videoOrigins = this.videoOrigins;
            this.selectedOrigin = this.videoOrigins[ 0 ]; //By default select the first origin from the list
            this.loadFrames( this.currentDate, true, true );
            this.viewer.scrollToEnd();
        } ) 
    }

    /**
     * Calls when a user selects a new camera
     * @private
     * @param {string} originId 
     */
    onCameraChanged( originId ){
        this.viewer.clear();
        this.selectedOrigin = this.videoOrigins.filter( origin => origin.origin === originId )[ 0 ];
        this.loadFrames( this.currentDate, true, true );
        this.viewer.scrollToEnd();
    }

    /**
     * Returns current date
     * @private
     */
    get currentDate(){
        return new Date();
    }

    /**
     * Formats date as `${hours}:${minutes}`
     * @private
     * @param {Date} date
     * @returns {string} - string in `${hours}:${minutes}` format 
     */
    formatDate( date ){
        
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if ( hours < 10 ){
            hours = `0${hours}`;
        }

        if ( minutes < 10 ){
            minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
    }

    /**
     * Generates frames from start Date forward or backward depends on insertBefore
     * @private
     * @param {Date} startDate - from what date to start
     * @param {boolean} insertBefore - if true generates date backward, else forward from startDate
     * @param {boolean} includeStartDate - if true start Date will be included, otherwise not included
     * @returns {Array} - array of frames
     */
    createFrames( startDate, insertBefore = true, includeStartDate = false ){
        
        const frames = [];
        const direction = insertBefore ? -1 : 1;
        const offset = includeStartDate ? 0 : 1;
        
        for( let i = offset; i < this.NUM_REQUESTED_FRAMES + offset; i ++ ){
            
            const date = new Date( startDate.getTime() + i * this.FRAME_INTERVAL * direction );
            
            if ( ! insertBefore ){
                if ( date.getTime() + this.FRAME_INTERVAL > this.currentDate.getTime() ){
                    break;
                }
            }

            const frame = { date: date, id : DateParser.serialize( date ), label : this.formatDate( date ) };

            frames.push( frame );
        }

        this.viewer.addFrames( frames, insertBefore );

        return frames;
    }

    /**
     * Generates frames from start Date forward or backward depends on insertBefore
     * Then starts loading it
     * @private
     * @param {Date} startDate - from what date to start
     * @param {boolean} insertBefore - if true generates date backward, else forward from startDate
     * @param {boolean} includeStartDate - if true start Date will be included, otherwise not included
     * @returns {Promise<Array>}
     */
    loadFrames( startDate, insertBefore = true, includeStartDate = false ){
        
        const frames = this.createFrames( startDate, insertBefore, includeStartDate );
        
        if ( frames.length === 0 ){
            return null;
        }

        const promises = [];

        this.pending = true;

        frames.forEach( ( frame ) => {
            const promise = this.api.getMedia( this.selectedOrigin.origin, frame.date ).then( ( blob ) => {
                this.viewer.setFrameSrc( frame.id, URL.createObjectURL( blob ) );
            } ).catch( () => {
                this.viewer.setFrameAsNotFound( frame.id );
            } )

            promises.push( promise );
        } )

        return Promise.all( promises ).then( () => {
            this.pending = false;
        } ).catch( () => { this.pending = false; } );
    }

    /**
     * Calls when the scroll reached left limit
     * @private 
     * @param {string} frame_id 
     */
    onLeftLimitReached( frame_id ){

        if ( ! this.pending ){
            const startDate = DateParser.deserialize( frame_id );
            
            if ( this.loadFrames( startDate, true ) ) {
                this.viewer.scrollToFrameById( frame_id );
                console.log( 'left limit reached', frame_id );
            }
            
        }
    
    }

    /**
     * Calls when the scroll reached right limit
     * @private 
     * @param {string} frame_id 
     */
    onRightLimitReached( frame_id ){

        if ( ! this.pending ){
            const startDate = DateParser.deserialize( frame_id );
            
            if ( this.loadFrames( startDate, false ) ) {
                this.viewer.scrollToFrameById( frame_id );
                console.log( 'right limit reached', frame_id );
            }
            
        }
        
    }

}