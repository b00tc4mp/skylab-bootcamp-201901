  
import { toast } from 'react-toastify';

function feedback(message, level) {
	toast.dismiss();
	toast[level](message, {
		autoClose: level === 'error' ? false : 3000,
		className: level === 'error' ? 'error-background' : 'success-background',
		position: 'top-right',
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		draggablePercent: 60,
	});
}

export default feedback;