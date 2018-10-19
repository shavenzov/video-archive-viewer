/**
 * DateParser implements static methods for Date serialization/deserialization
 * @public
 * @class
 */
export default class DateParser {

    /**
     * Deserializes string to js Date object
     * @static
     * @param {string} str - string in `${year}${month}${day}T${hours}${minutes}${seconds}` format
     * @returns {Date} - JS Date object
     */
    static deserialize( str ){
       let year = parseInt( str.substr( 0, 4 ) );
       let month = parseInt( str.substr( 4, 2 ) ) - 1;
       let day = parseInt( str.substr( 6, 2 ) );
       
       let hours = parseInt( str.substr( 9, 2 ) );
       let minutes = parseInt( str.substr( 11, 2 ) );
       let seconds = parseInt( str.substr( 13, 2 ) );
       let milliseconds = str.length > 16 ? parseInt( str.substr( 16, 3 ) ) : 0;

       return new Date( year, month, day, hours, minutes, seconds, milliseconds )
    }

    /**
     * Serializes js Date object to string
     * @static
     * @param {Date} date - JS Date object
     * @returns {string} - string in `${year}${month}${day}T${hours}${minutes}${seconds}` format
     */
    static serialize( date ){

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let milliseconds = date.getMilliseconds();

        if ( month < 10 ){
            month = `0${month}`;
        }

        if ( day < 10 ){
            day = `0${day}`;
        }

        if ( hours < 10 ){
            hours = `0${hours}`;
        }

        if ( minutes < 10 ){
            minutes = `0${minutes}`;
        }

        if ( seconds < 10 ){
            seconds = `0${seconds}`;
        }

        if ( milliseconds < 10 ){
            milliseconds = `00${milliseconds}`;
        }
        else if ( milliseconds < 100 ){
            milliseconds = `0${milliseconds}`;
        }

        let str = `${year}${month}${day}T${hours}${minutes}${seconds}`;

        if ( milliseconds !== '000' ){
            str += `.${milliseconds}000`;
        }

        return str;
    }

}