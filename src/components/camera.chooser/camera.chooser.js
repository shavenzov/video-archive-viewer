/**
 * Implements CameraChooser component logic based on HTML <select></select>
 * @public
 * @class
 */
export default class CameraChooser {

    /**
     * The class constructor
     * @param {string} container_id - The id attribute value of container   
     */
    constructor( container_id ){

        this._videoOrigins = [];
        
        /**
         * It calls when a user select a new camera origin
         * ( origin ) => {} where origin is the camera origin id
         */
        this.camerachanged = null;

        this.selectUI = document.getElementById( container_id );
        this.selectUI.addEventListener( "change", () => this.onCameraChanged() );
    }

    /**
     * Fills the component with options
     * @private
     */
    populateOptions(){

        while ( this.selectUI.firstChild ) {
            this.selectUI.removeChild( this.selectUI.firstChild );
        }

        for( let i = 0; i < this.videoOrigins.length; i ++ ){
            
            const origin = this.videoOrigins[ i ];

            const el = document.createElement("option");
                  el.textContent = origin.friendlyNameShort;
                  el.value = origin.origin;
                  el.selected = i === 0;
        
            this.selectUI.appendChild( el ); 
        }
    } 

    /**
     * Calls when a user selects a new camera
     * @private
     */
    onCameraChanged(){

        const id = this.selectUI.options[ this.selectUI.selectedIndex ].value;

        if ( this.camerachanged ){
            this.camerachanged( id );
        }
    }

    /**
     * Getter for video origins ( list of displayed cameras )
     * @public
     */
    get videoOrigins(){
        return this._videoOrigins;
    }

    /**
     * Setter for video origins ( sets a new camera list )
     * @public
     */
    set videoOrigins( origins ){
        this._videoOrigins = origins.slice();
        this.populateOptions();
    }

}