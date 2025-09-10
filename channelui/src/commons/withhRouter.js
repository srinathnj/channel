import { useNavigate } from 'react-router';

export const withhRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    }
    return Wrapper;
};