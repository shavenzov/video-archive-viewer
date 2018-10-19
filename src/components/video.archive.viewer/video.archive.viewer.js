/**
 * Implements video archive viewer component
 * @public
 * @class
 */
export default class VideoArchiveViewer{

    /**
     * The class constructor
     * @param {string} container_id - The id attribute value of container   
     */
    constructor( container_id ){

        /**
         * Area size at the end's scroll where onrightlimitreached callback calls
         */
        this.RIGHT_GET_DATA_GAP = 250;
        
        /**
         * Area size at the start's scroll where nleftlimitreached callback calls
         */
        this.LEFT_GET_DATA_GAP = 10;
        
        /**
         * How many frames component can store
         * If number of frames more than MAX_FRAMES then component removes exceeded frames 
         */
        this.MAX_FRAMES = 60;

        this.container = document.getElementById( container_id );
        this.container.addEventListener( "scroll", ( event ) => this.onScroll( event ) );
        this.container.addEventListener( "wheel", ( event ) => this.onMouseWheel( event ) );

        /**
         * This callback calls then we scroll almost to start
         * For example when we need to add frames to the start
         * ( firstFrameId ) => {} - firstFrameId : the id of the first component's frame
         */
        this.onleftlimitreached = null;

        /**
         * This callback calls then we scroll almost to end
         * For example when we need to add frames to the end
         * ( lastFrameId ) => {} - lastFrameId : the id of the last component's frame
         */
        this.onrightlimitreached = null;
    }

    /**
     * Calls when a user scrolling the component by mouse wheel
     * @private
     * @param {WheelEvent} event 
     */
    onMouseWheel( event ){
        const direction = event.deltaY / Math.abs( event.deltaY );
        event.currentTarget.scrollLeft += direction * 72;
    }

    /**
     * Calls when the component is scrolling
     * @private
     * @param {UIEvent} event 
     */
    onScroll( event ){
        
        if ( event.currentTarget.scrollLeft <= this.LEFT_GET_DATA_GAP ){
            if ( this.onleftlimitreached ){
                this.onleftlimitreached( this.getIdByFrame( this.firstFrame ) );
            }
        }

        if ( event.currentTarget.scrollLeft + event.currentTarget.offsetWidth + this.RIGHT_GET_DATA_GAP >= event.currentTarget.scrollWidth ){
            if ( this.onrightlimitreached ){
                this.onrightlimitreached( this.getIdByFrame( this.lastFrame ) );
            }
        }

    }

    /**
     * Calls while creating a new frame
     * @private
     * @param {Object} frame - frame description
     * @param {string} frame.id - frame id
     * @param {string} frame.label - frame label ( time )
     * @returns {HTMLElement} - frame that was just created by factory method
     */
    frameFactory( frame ){
        const div = document.createElement( 'div' );
              div.className = 'frame';
              div.setAttribute( 'data-frame-id', frame.id );
                  
        const time = document.createElement( 'time' );
        const text = document.createTextNode( frame.label );
        
        time.appendChild( text );

        const img = document.createElement( 'img' );
              img.width = 250;
              img.height = 188;
              img.src = 'assets/loader.gif';
              img.className = 'loading';

        const footer = document.createElement( 'footer' );

        div.appendChild( time );
        div.appendChild( img );
        div.appendChild( footer );
        
        return div;
    }

    /**
     * Adds new frames to the component's start or end
     * @public 
     * @param {Array} frames - array of frame descriptions
     * @param {boolean} insertBefore - if true frames will be inserted the start. Otherwise to the end. 
     */
    addFrames( frames, insertBefore = true ){

        this.clearExcessFrames( insertBefore );

        frames.forEach( ( frame ) => {
           const vFrame = this.frameFactory( frame );
           
           if ( insertBefore ){
            const firstChild = this.container.firstChild;
            
            if ( firstChild ){
                this.container.insertBefore( vFrame, firstChild );
                return;
              }
            }
           
            this.container.appendChild( vFrame );
        })

    }

    /**
     * Sets a frame's state as "frame not found"
     * @public
     * @param {string} frame_id - the frame id
     */
    setFrameAsNotFound( frame_id ){
        this.setFrameSrc( frame_id, 'assets/no-image-icon.png' );

        const frame = this.getFrameById( frame_id );
              frame.className = 'frame-not-found';
    }

    /**
     * Updates a frame's image url
     * @public
     * @param {string} frame_id  - the frame id
     * @param {string} url - the new url
     */
    setFrameSrc( frame_id, url ){
        
        const div = this.getFrameById( frame_id );

        if ( div ){
            const img = div.getElementsByTagName( 'img' );

            if ( img ){
                img[ 0 ].src = url;
                img[ 0 ].className = '';
            }
        }
    }    

    /**
     * Returns a HTMLElement frame by id
     * @private
     * @param {string} frame_id - the frame id
     * @returns {HTMLElement|null} 
     */
    getFrameById( frame_id ){
       const frames = this.container.getElementsByTagName( 'div' );

       for ( let i = 0; i < frames.length; i ++ ){
           const frame = frames[ i ];

           if ( frame.getAttribute( 'data-frame-id' ) === frame_id ){
               return frame;
           }
       }
       
       return null;
    }

    /**
     * Returns the first HTMLElement frame
     * @private
     */
    get firstFrame(){
        return this.container.getElementsByTagName( 'div' )[0];
    }

    /**
     * Returns the last HTMLElement frame
     * @private
     */
    get lastFrame(){
        const frames = this.container.getElementsByTagName( 'div' );
        return frames[ frames.length - 1 ];
    }

    /**
     * Returns the id of HTMLElement frame
     * @private
     * @param {HTMLElement} frame
     * @returns {string} 
     */
    getIdByFrame( frame ){
        return frame.getAttribute( 'data-frame-id' );
    }

    /**
     * Scrolls to the end
     * @public
     */
    scrollToEnd(){
        
        setTimeout( () => {
            this.container.scrollLeft = this.container.scrollWidth;
        } )
 
    }

    /**
     * Scrolls to HTMLElement frame with equal frame_id
     * @public
     * @param {string} frame_id 
     */
    scrollToFrameById( frame_id ){
        const frame = this.getFrameById( frame_id );

        setTimeout( () => {
            this.container.scrollLeft = frame.offsetLeft;
        } )
        
    }

    /**
     * Clears exceeded frames at the end or at the begin.
     * If number of frames more than MAX_FRAMES then component removes exceeded frames
     * @private
     * @param {boolean} removeAfter - if true removes frames at the end. Otherwise at the start. 
     */
    clearExcessFrames( removeAfter = true ){

        const frames = this.container.getElementsByTagName( 'div' );
        
        while( frames.length >= this.MAX_FRAMES ){
            const frame = removeAfter ? frames[ frames.length - 1 ] : frames[ 0 ];
            this.container.removeChild( frame );
        }

    }

    /**
     * Removes all frames. Clears component.
     * @public
     */
    clear(){
        while ( this.container.lastChild ) {
            this.container.removeChild( this.container.lastChild );
        }
    }

}