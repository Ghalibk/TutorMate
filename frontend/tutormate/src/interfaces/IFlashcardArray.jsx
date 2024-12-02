import PropTypes from "prop-types";

const FlashcardArrayProps = {
  /**
   * Array of objects that populate the card.
   */
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Unique identifier for the card.
       */
      id: PropTypes.number.isRequired,
      /**
       * HTML string for the front of the card.
       */
      frontHTML: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      /**
       * HTML string for the back of the card.
       */
      backHTML: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      /**
       * Styles for the front of the card.
       */
      frontCardStyle: PropTypes.object,
      /**
       * Styles for the content of the front facing card.
       */
      frontContentStyle: PropTypes.object,
      /**
       * Styles for the back of the card.
       */
      backCardStyle: PropTypes.object,
      /**
       * Styles for the content of the back facing card.
       */
      backContentStyle: PropTypes.object,
      /**
       * Class name for each card container.
       */
      className: PropTypes.string,
      /**
       * Card Height in px|%|vh|vw.
       */
      height: PropTypes.string,
      /**
       * Card Width in px|%|vh|vw.
       */
      width: PropTypes.string,
      /**
       * Card border radius in px|%|vh|vw.
       */
      borderRadius: PropTypes.string,
      /**
       * Styles for the card container.
       */
      style: PropTypes.object,
    })
  ).isRequired,
  /**
   * Show or hide control arrows
   * @default true
   */
  controls: PropTypes.bool,
  /**
   * when passed with a ref, ref.current object will contain reference to `nextCard()`, `prevCard()` and `resetArray()` functions
   */
  forwardRef: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.shape({
        nextCard: PropTypes.func,
        prevCard: PropTypes.func,
        resetArray: PropTypes.func,
      }),
    }),
    PropTypes.oneOf([null]),
  ]),
  /**
   * Show or hide the current count of card
   */
  showCount: PropTypes.bool,
  /**
   * Style of all front cards
   */
  frontCardStyle: PropTypes.object,
  /**
   * Style of all front card content
   */
  frontContentStyle: PropTypes.object,
  /**
   * Style of all back cards
   */
  backCardStyle: PropTypes.object,
  /**
   * Style of all back card content
   */
  backContentStyle: PropTypes.object,
  /**
   * Flashcard container style
   */
  FlashcardArrayStyle: PropTypes.object,
  /**
   * Callback function that is called when card in view changes with card id and index
   */
  onCardChange: PropTypes.func,
  /**
   * Callback function that is called when a card is flipped with card id and flip state
   */
  onCardFlip: PropTypes.func,
  /**
   * when passed with a ref, ref.current object will contain reference to `flipCard()` for the current card
   */
  currentCardFlipRef: PropTypes.shape({
    current: PropTypes.func,
  }),
  /**
   * When set to true, the cards will repeat from the beginning when the last card is reached.
   * @default false
   */
  cycle: PropTypes.bool,
};

export default FlashcardArrayProps;
