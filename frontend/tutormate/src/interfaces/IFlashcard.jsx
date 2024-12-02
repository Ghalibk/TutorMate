import PropTypes from "prop-types";

const FlashcardProps = {
  /** 
   * HTML string or JSX element to be displayed on the front of the card
   */
  frontHTML: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  /**
   * CSS styles to be applied to the front side of the card
   */
  frontCardStyle: PropTypes.object,
  /**
   * CSS styles to be applied to the content of the front side of the card
   */
  frontContentStyle: PropTypes.object,
  /**
   * HTML string or JSX element to be displayed on the back of the card
   */
  backHTML: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  /**
   * CSS styles to be applied to the back side of the card
   */
  backCardStyle: PropTypes.object,
  /**
   * CSS styles to be applied to the content of the back side of the card
   */
  backContentStyle: PropTypes.object,
  /**
   * CSS class to be applied to the wrapper div
   */
  className: PropTypes.string,
  /**
   * CSS height of the wrapper div
   */
  height: PropTypes.string,
  /**
   * CSS border-radius of the wrapper div
   */
  borderRadius: PropTypes.string,
  /**
   * CSS width of the wrapper div
   */
  width: PropTypes.string,
  /**
   * CSS styles to be applied to the wrapper div
   */
  style: PropTypes.object,
  /**
   * Callback function to be called when the card is flipped
   */
  onCardFlip: PropTypes.func,
  /**
   * When passed with a ref, ref.current object will contain reference to `flipCard()` function
   */
  manualFlipRef: PropTypes.shape({
    current: PropTypes.func,
  }),
};

export default FlashcardProps;
