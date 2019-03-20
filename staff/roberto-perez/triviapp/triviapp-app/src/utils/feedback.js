import { toast } from 'react-toastify';

function feedback(message, level, toastId) {
	toast.dismiss();
	return toast[level](message, {
		autoClose: level === 'error' ? false : 3000,
		className: level === 'error' ? 'error-background' : 'success-background',
		position: 'bottom-right',
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		draggablePercent: 60,
	});
}

export default feedback;
