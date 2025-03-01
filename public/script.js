document.addEventListener('DOMContentLoaded', function() {
    // Load Firebase configuration from a separate file
    // This allows the config to be kept out of version control
    fetch('/firebase-config.json')
        .then(response => response.json())
        .then(firebaseConfig => {
            // Initialize Firebase with loaded config
            firebase.initializeApp(firebaseConfig);
            
            // Initialize Firestore
            const db = firebase.firestore();
            const messagesCollection = db.collection('messages');
            
            // DOM Elements
            const themeSwitch = document.getElementById('theme-switch');
            const themeIcon = document.getElementById('theme-icon');
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            const messageInput = document.getElementById('message-input');
            const charCount = document.querySelector('.char-count');
            const publishBtn = document.getElementById('publish-btn');
            const publishResult = document.getElementById('publish-result');
            const shareLink = document.getElementById('share-link');
            const copyLinkBtn = document.getElementById('copy-link');
            const newMessageBtn = document.getElementById('new-message');
            const messageCode = document.getElementById('message-code');
            const viewBtn = document.getElementById('view-btn');
            const messageDisplay = document.getElementById('message-display');
            const messageContent = document.getElementById('message-content');
            const messageAuthor = document.getElementById('message-author');
            const messageDate = document.getElementById('message-date');
            const copyMessageBtn = document.getElementById('copy-message');
            const shareMessageBtn = document.getElementById('share-message');
            const errorMessage = document.getElementById('error-message');
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            const previewToggle = document.getElementById('preview-toggle');
            const markdownPreview = document.getElementById('markdown-preview');
            const modalOverlay = document.getElementById('modal-overlay');
            const modalTitle = document.getElementById('modal-title');
            const modalContent = document.getElementById('modal-content');
            const modalClose = document.getElementById('modal-close');
            const openRules = document.getElementById('open-rules');
            const openTerms = document.getElementById('open-terms');
            const openPrivacy = document.getElementById('open-privacy');
            const markdownHelpBtn = document.getElementById('markdown-help-btn');
            const markdownModal = document.getElementById('markdown-modal');
            const markdownModalClose = document.getElementById('markdown-modal-close');
            
            // Confetti setup
            const jsConfetti = new JSConfetti();
            
            // Theme Toggle
            themeSwitch.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.setAttribute('icon', 'line-md:sunny-outline-to-moon-loop-transition');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.setAttribute('icon', 'line-md:moon-to-sunny-outline-loop-transition');
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                themeIcon.setAttribute('icon', 'line-md:sunny-outline-to-moon-loop-transition');
            }
            
            // Tab Navigation
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.getAttribute('data-tab');
                    
                    // Update active tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Show corresponding tab content
                    tabContents.forEach(content => {
                        content.classList.remove('show');
                        if (content.id === `${tabId}-tab`) {
                            content.classList.add('show');
                        }
                    });
                });
            });
            
            // Markdown Preview Toggle
            previewToggle.addEventListener('change', function() {
                if (this.checked) {
                    const markdown = messageInput.value;
                    const html = DOMPurify.sanitize(marked.parse(markdown));
                    markdownPreview.innerHTML = html;
                    markdownPreview.classList.remove('hidden');
                    messageInput.classList.add('hidden');
                } else {
                    markdownPreview.classList.add('hidden');
                    messageInput.classList.remove('hidden');
                }
            });
            
            // Live Markdown Preview Update
            messageInput.addEventListener('input', () => {
                const count = messageInput.value.length;
                charCount.textContent = `${count} characters`;
                
                if (previewToggle.checked) {
                    const markdown = messageInput.value;
                    const html = DOMPurify.sanitize(marked.parse(markdown));
                    markdownPreview.innerHTML = html;
                }
            });
            
            // Character Count
            messageInput.addEventListener('input', () => {
                const count = messageInput.value.length;
                charCount.textContent = `${count} characters`;
            });
            
            // Publish Message with deduplication check
            publishBtn.addEventListener('click', async () => {
                const messageText = messageInput.value.trim();
                
                if (!messageText) {
                    showToast('Please enter a message before publishing');
                    return;
                }
                
                try {
                    // Disable button during publish
                    publishBtn.disabled = true;
                    publishBtn.innerHTML = '<iconify-icon icon="line-md:loading-twotone-loop"></iconify-icon> Publishing...';
                    
                    // Check if message text already exists
                    const querySnapshot = await messagesCollection.where('content', '==', messageText).get();
                    let messageId;
                    
                    if (!querySnapshot.empty) {
                        // Use existing message
                        messageId = querySnapshot.docs[0].id;
                        showToast('Message already exists, using existing link');
                    } else {
                        // Create a new message record
                        const username = localStorage.getItem('username') || 'Anonymous';
                        const newMessage = {
                            content: messageText,
                            username: username,
                            created_at: firebase.firestore.FieldValue.serverTimestamp()
                        };
                        
                        const docRef = await messagesCollection.add(newMessage);
                        messageId = docRef.id;
                    }
                    
                    // Generate share link
                    const messageLink = `${window.location.origin}${window.location.pathname}?m=${messageId}`;
                    shareLink.value = messageLink;
                    
                    // Show success UI
                    publishResult.classList.remove('hidden');
                    document.querySelector('.compose-area .card').classList.add('hidden');
                    
                    // Create confetti celebration
                    jsConfetti.addConfetti({
                        confettiColors: [
                            '#6200ee', '#bb86fc', '#03dac6', '#018786'
                        ],
                        confettiRadius: 6,
                        confettiNumber: 100
                    });
                    
                } catch (error) {
                    console.error('Error publishing message:', error);
                    showToast('Failed to publish message. Please try again.');
                } finally {
                    publishBtn.disabled = false;
                    publishBtn.innerHTML = '<iconify-icon icon="line-md:sending-loop"></iconify-icon> Publish';
                }
            });
            
            // Copy Link
            copyLinkBtn.addEventListener('click', () => {
                shareLink.select();
                navigator.clipboard.writeText(shareLink.value)
                    .then(() => {
                        showToast('Link copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                        showToast('Failed to copy link');
                    });
            });
            
            // New Message
            newMessageBtn.addEventListener('click', () => {
                messageInput.value = '';
                charCount.textContent = '0 characters';
                publishResult.classList.add('hidden');
                document.querySelector('.compose-area .card').classList.remove('hidden');
            });
            
            // View Message with Markdown rendering
            viewBtn.addEventListener('click', async () => {
                const code = messageCode.value.trim();
                
                if (!code) {
                    showToast('Please enter a message code or URL');
                    return;
                }
                
                try {
                    // Disable button during fetch
                    viewBtn.disabled = true;
                    viewBtn.innerHTML = '<iconify-icon icon="line-md:loading-twotone-loop"></iconify-icon> Loading...';
                    
                    // Extract message ID from input (handle both full URLs and just the ID)
                    let messageId = code;
                    if (code.includes('?m=')) {
                        messageId = code.split('?m=')[1];
                    }
                    
                    // Get the message from Firestore
                    const messageDoc = await messagesCollection.doc(messageId).get();
                    
                    if (messageDoc.exists) {
                        const message = messageDoc.data();
                        
                        // Show message content with Markdown rendering
                        messageContent.innerHTML = DOMPurify.sanitize(marked.parse(message.content));
                        
                        // Format date
                        const date = message.created_at ? message.created_at.toDate() : new Date();
                        messageDate.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                        
                        // Display message and hide error
                        messageDisplay.classList.remove('hidden');
                        errorMessage.classList.add('hidden');
                    } else {
                        // Show error and hide message
                        errorMessage.classList.remove('hidden');
                        messageDisplay.classList.add('hidden');
                    }
                } catch (error) {
                    console.error('Error retrieving message:', error);
                    errorMessage.classList.remove('hidden');
                    messageDisplay.classList.add('hidden');
                } finally {
                    viewBtn.disabled = false;
                    viewBtn.innerHTML = '<iconify-icon icon="line-md:document-search-twotone"></iconify-icon> View';
                }
            });
            
            // Copy Message Text
            copyMessageBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(messageContent.textContent)
                    .then(() => {
                        showToast('Message copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                        showToast('Failed to copy message');
                    });
            });
            
            // Share Message
            shareMessageBtn.addEventListener('click', () => {
                const url = window.location.href;
                if (navigator.share) {
                    navigator.share({
                        title: 'MessageXL',
                        text: 'Check out this message on MessageXL',
                        url: url
                    })
                    .catch(err => {
                        console.error('Could not share:', err);
                        showToast('Failed to share message');
                    });
                } else {
                    navigator.clipboard.writeText(url)
                        .then(() => {
                            showToast('Link copied to clipboard!');
                        })
                        .catch(err => {
                            console.error('Could not copy text: ', err);
                            showToast('Failed to copy link');
                        });
                }
            });
            
            // Modal Functions
            function openModal(title, content) {
                modalTitle.textContent = title;
                modalContent.innerHTML = content;
                modalOverlay.classList.remove('hidden');
                setTimeout(() => {
                    modalOverlay.classList.add('show');
                }, 10);
            }
            
            function closeModal() {
                modalOverlay.classList.remove('show');
                setTimeout(() => {
                    modalOverlay.classList.add('hidden');
                }, 300);
            }
            
            // Open Modal Event Listeners
            openRules.addEventListener('click', (e) => {
                e.preventDefault();
                openModal('Rules & Policies', `
                    <h3>Acceptable Use Policy</h3>
                    <p>MessageXL allows users to share longer text content. However, users must comply with the following rules:</p>
                    <ul>
                        <li>No illegal content including but not limited to copyright infringement, threats, harassment, etc.</li>
                        <li>No hateful, discriminatory, or violent content</li>
                        <li>No spam or abusive behavior</li>
                        <li>No sharing of private information without consent</li>
                    </ul>
                    
                    <h3>Disclaimer</h3>
                    <p>The creator of MessageXL is not responsible for any user-generated content. While we strive to maintain a safe platform, we cannot monitor all content. Users are responsible for their own messages.</p>
                    
                    <h3>Liability</h3>
                    <p>Using MessageXL is at your own risk. We do not guarantee uninterrupted or error-free service. The platform may occasionally experience downtime or data loss.</p>
                `);
            });
            
            openTerms.addEventListener('click', (e) => {
                e.preventDefault();
                openModal('Terms of Service', `
                    <h3>Acceptance of Terms</h3>
                    <p>By using MessageXL, you agree to these Terms of Service. If you do not agree, please do not use the service.</p>
                    
                    <h3>Content Ownership</h3>
                    <p>Users retain ownership of the content they post, but grant MessageXL a non-exclusive license to store, display, and share that content.</p>
                    
                    <h3>Service Modifications</h3>
                    <p>We reserve the right to modify or discontinue the service at any time without notice.</p>
                    
                    <h3>Termination</h3>
                    <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.</p>
                    
                    <h3>Limitation of Liability</h3>
                    <p>MessageXL and its creators are not liable for any damages arising from the use of our service.</p>
                    
                    <h3>Governing Law</h3>
                    <p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
                `);
            });
            
            openPrivacy.addEventListener('click', (e) => {
                e.preventDefault();
                openModal('Privacy Policy', `
                    <h3>Information Collection</h3>
                    <p>MessageXL collects minimal information necessary to provide the service, including usernames and message content.</p>
                    
                    <h3>Information Usage</h3>
                    <p>We use collected information solely to provide and improve the service. We do not sell or rent personal information to third parties.</p>
                    
                    <h3>Data Storage</h3>
                    <p>Message content is stored in our database and associated with your username. Messages are public and can be accessed by anyone with the link.</p>
                    
                    <h3>Cookies</h3>
                    <p>We use local storage to remember your preferences, such as theme choice.</p>
                    
                    <h3>Third-Party Services</h3>
                    <p>MessageXL uses external services for hosting. These services may collect additional information according to their own privacy policies.</p>
                    
                    <h3>Changes to Privacy Policy</h3>
                    <p>We may update our Privacy Policy from time to time. We will notify users of any changes by updating the date at the top of this policy.</p>
                `);
            });
            
            // Markdown Help Modal
            markdownHelpBtn.addEventListener('click', () => {
                markdownModal.classList.remove('hidden');
                setTimeout(() => {
                    markdownModal.classList.add('show');
                }, 10);
            });
            
            markdownModalClose.addEventListener('click', () => {
                markdownModal.classList.remove('show');
                setTimeout(() => {
                    markdownModal.classList.add('hidden');
                }, 300);
            });
            
            // Close Modal Event Listeners
            modalClose.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
            
            // Close Markdown Modal on outside click
            markdownModal.addEventListener('click', (e) => {
                if (e.target === markdownModal) {
                    markdownModal.classList.remove('show');
                    setTimeout(() => {
                        markdownModal.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Handle ESC key for modals
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    markdownModal.classList.remove('show');
                    setTimeout(() => {
                        markdownModal.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Real-time updates for the current message being viewed
            function setupRealtimeListener(messageId) {
                if (messageId) {
                    return messagesCollection.doc(messageId).onSnapshot(doc => {
                        if (doc.exists) {
                            const message = doc.data();
                            messageContent.innerHTML = DOMPurify.sanitize(marked.parse(message.content));
                            
                            // Format date
                            const date = message.created_at ? message.created_at.toDate() : new Date();
                            messageDate.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                        }
                    });
                }
                return null;
            }
            
            let currentListener = null;
            
            // Check URL for message ID on page load
            function checkUrlForMessage() {
                const urlParams = new URLSearchParams(window.location.search);
                const messageId = urlParams.get('m');
                
                if (messageId) {
                    // Switch to view tab
                    tabs.forEach(tab => {
                        if (tab.getAttribute('data-tab') === 'view') {
                            tab.click();
                        }
                    });
                    
                    // Fill in the message code input and trigger view
                    messageCode.value = messageId;
                    viewBtn.click();
                    
                    // Setup real-time listener for this message
                    currentListener = setupRealtimeListener(messageId);
                }
            }
            
            // Toast notification
            function showToast(message) {
                toastMessage.textContent = message;
                toast.classList.remove('hidden');
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        toast.classList.add('hidden');
                    }, 300);
                }, 3000);
            }
            
            // Initialize
            checkUrlForMessage();
        });
});