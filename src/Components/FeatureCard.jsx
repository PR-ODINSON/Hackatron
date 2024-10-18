import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const FeatureCard = ({ icon, title, description }) => {
    return (
        <>
            <div className="bg-indigo-50 rounded-lg p-6 flex items-start">
                <FontAwesomeIcon icon={icon} className="text-green-600 text-3xl mr-4" />
                <div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </>
    )
}

FeatureCard.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default FeatureCard