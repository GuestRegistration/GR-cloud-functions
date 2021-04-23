const { gql } =  require('apollo-server-express');

const schema = gql`

    # extend type Query {
    #     getVerificationSession (id: ID!): StripeVerificationSession
    #     getVerificationReport (id: ID!): StripeVerificationReport
    # }

    # extend type Mutation {
    #     createVerificationSession (stripe_account: ID!, metadata: StripeVerificationMetadataInput, return_url: String, refresh_url: String): StripeVerificationSession
    # }

    # extend type Subscription {
    #     # Your subscription goes here
    # }

    input StripeVerificationMetadataInput {
        user_id: ID
        property_id: ID
    }
    type StripeVerificationDate {
        year: Int
        month: Int
        day: Int
    }

    type StripeVerificationError {
        code: String
        reason: String
    }

    type StripeVerificationConfig {
        document: StripeVerificationConfigDocument
    }

        type StripeVerificationConfigDocument {
            document_types: [String] #Enum: driving_license | passport | id_card
            require_id_number: Boolean
            require_live_capture: Boolean
            require_matching_selfie: Boolean
        }

    type StripeVerificationMetadata {
        user_id: ID,
        property_id: ID,
    }

    type StripeVerificationSession {
        id: String
        object: String
        created: String
        last_error: StripeVerificationError #Code->Enum: 
        livemode: Boolean
        metadata: StripeVerificationMetadata,
        options: StripeVerificationConfig
        status: String
        type: String
        url: String
        # verified_outputs: String
        last_verification_report: StripeVerificationReport
    }

    type StripeVerificationReport {
        id: ID
        object: String
        created: Int
        livemode: Boolean
        type: String #Enum: document | id_number
        verification_session: ID #VerificationSession 
        document: StripeVerificationReportDocument 
        options: StripeVerificationConfig
        selfie: StripeVerificationReportSelfie
        metadata: StripeVerificationMetadata
        files: StripeVerificationFiles
    }

        type StripeVerificationReportDocument {
            status: String #Enum: processing | verified | unverified
            error: StripeVerificationError #Code->Enum: document_expired | document_invalid_other | document_type_not_supported | document_type_not_allowed | document_not_readable | document_not_original | document_manipulated
            first_name: String
            last_name: String
            dob: StripeVerificationDate
            address: StripeVerificationDocumentAddress
            document_type: String #Enum: driving_license | passport | id_card
            document_number: String #Expandable --> https://stripe.com/docs/api/expanding_objects
            back: ID #FileUpload,
            front: ID #FileUpload,
            expiration_date: StripeVerificationDate
            issued_date: StripeVerificationDate
            issuing_country: String
        }

        type StripeVerificationDocumentAddress {
            line1: String
            city: String
            state: String
            zip:Int
            country: String
        }

    type StripeVerificationReportSelfie {
        document_front: ID #FileUpload
        error: StripeVerificationError #Code->Enum: selfie_document_non_photo_id | selfie_no_face_detected | selfie_multiple_faces_detected | selfie_face_mismatch | selfie_manipulated
        selfie: ID #FileUpload
        status: String #Enum: processing | verified | unverified
    }
       
    type StripeVerificationFiles {
        document_front: StripeFile
        document_back: StripeFile
        selfie: StripeFile
    }
`;

module.exports = schema;
