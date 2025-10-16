# Changelog

## [1.1.1] - 2025-01-16

### ✨ Added
- **Enhanced Account Management System**
  - Complete user profile editing functionality
  - Password change feature with validation
  - Address book management interface
  - Modern tabbed interface for better UX

### 🔧 Fixed
- Fixed urql Provider error in account management
- Resolved client-side GraphQL dependency issues
- Improved error handling and user feedback

### 🎨 Improved
- Replaced basic account page with comprehensive management interface
- Added server-side API routes for secure operations
- Enhanced UI/UX with modern design patterns
- Better form validation and success/error messaging

### 🏗️ Technical Changes
- Created `/api/account/update` endpoint for profile updates
- Created `/api/account/password-change` endpoint for password changes
- Updated GraphQL queries to include address information
- Implemented proper error handling and validation

### 📱 Features
- **Profile Tab**: Edit first name, last name (email read-only)
- **Password Tab**: Change password with current password verification
- **Addresses Tab**: View saved addresses with default indicators
- **Orders Tab**: Quick access to order history
- **Quick Actions**: Easy access to common functions

---

## [1.1.0] - Previous Version
- Basic storefront functionality
- Simple account page with limited features
