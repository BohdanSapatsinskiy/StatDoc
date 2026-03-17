import CookieConsent from "react-cookie-consent";

/**
 * Cookie consent banner component.
 *
 * Displays a notification asking the user to accept or decline cookie usage.
 * Stores the user's preference locally to ensure proper application behavior.
 *
 * No tracking or third-party cookies are used.
 */
export const CookieConsentBanner = () => {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Reject"
            enableDeclineButton
            cookieName="blackjack_gdpr_consent"
            expires={150}
        >
            This application stores your consent preference locally to ensure proper functionality.
            No tracking or third-party cookies are used.
        </CookieConsent>
    );
};