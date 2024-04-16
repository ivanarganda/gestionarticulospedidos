import React , { useState } from 'react'

const MsgContext = React.createContext();


const MsgProvider = ({children})=>{

    const [ msg , setMsg ] = useState('');
    const [ opened , setOpenned ] = useState( false );
    const [ color , setColor ] = useState(null);
    const [ positions , setPositions ] = useState({
        vertical: 'bottom',
        horizontal: 'left',
    })
    const [ time , setTime ] = useState(2000);

    const handleClose = (event)=>{
        setOpenned(false);
    }

    const useMessage = ( msg , color , time , vertical = false , horizontal = false )=>{
        setOpenned( true );
        setMsg( msg );
        setColor( color );
        setTime( time );
        if ( vertical && horizontal ){
            setPositions({
                ...positions,
                vertical:vertical,
                horizontal:horizontal
            })
        }
    }

    return (
        <MsgContext.Provider value={{ color , msg , time , opened , positions , handleClose , useMessage }}>
            {children}
        </MsgContext.Provider>
    )
}

export { MsgContext , MsgProvider }