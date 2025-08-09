// Test script to debug email sending issues
// Run with: node test-email.js

const { Resend } = require('resend');

async function testEmails() {
  console.log('Testing email configuration...');
  
  // Check environment variables
  const requiredEnvs = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    CONTACT_TO: process.env.CONTACT_TO,
    CONTACT_REPLY_TO: process.env.CONTACT_REPLY_TO,
  };

  console.log('Environment variables:');
  Object.entries(requiredEnvs).forEach(([key, value]) => {
    console.log(`${key}: ${value ? 'SET' : 'MISSING'}`);
    if (value && (key === 'RESEND_FROM' || key === 'CONTACT_TO' || key === 'CONTACT_REPLY_TO')) {
      console.log(`  Value: ${value}`);
    }
  });

  const missingEnvs = Object.entries(requiredEnvs)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingEnvs.length > 0) {
    console.error(`\n❌ Missing required environment variables: ${missingEnvs.join(', ')}`);
    console.log('\nCreate a .env.local file with:');
    console.log('RESEND_API_KEY=your_api_key_here');
    console.log('RESEND_FROM="The Butterfly Cleaning <no-reply@thebutterflycleaning.co>"');
    console.log('CONTACT_TO=info@thebutterflycleaning.co');
    console.log('CONTACT_REPLY_TO=info@thebutterflycleaning.co');
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log('\n🧪 Testing owner notification email...');
    const ownerResult = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: [process.env.CONTACT_TO],
      replyTo: 'test@example.com',
      subject: 'Test Owner Notification - Contact Form Debug',
      html: `
        <h2>Test Owner Notification</h2>
        <p><strong>Name:</strong> Test User</p>
        <p><strong>Phone:</strong> <a href="tel:555-123-4567">555-123-4567</a></p>
        <p><strong>Email:</strong> test@example.com</p>
        <p><strong>Message:</strong> This is a test message to debug email delivery.</p>
      `,
      text: 'Test Owner Notification\n\nName: Test User\nPhone: 555-123-4567\nEmail: test@example.com\nMessage: This is a test message to debug email delivery.',
    });

    console.log('✅ Owner email sent successfully!');
    console.log('Email ID:', ownerResult.data?.id);

    console.log('\n🧪 Testing customer auto-reply...');
    const customerResult = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: ['test@example.com'], // Replace with your email for testing
      replyTo: process.env.CONTACT_REPLY_TO,
      subject: 'Test Customer Auto-Reply - Contact Form Debug',
      html: `
        <p>Hi Test User,</p>
        <p>Thanks for reaching out to The Butterfly Cleaning! This is a test auto-reply to debug email delivery.</p>
        <p>If it's urgent, call us at <a href="tel:(647) 327-5163">(647) 327-5163</a>.</p>
        <p>— The Butterfly Cleaning</p>
      `,
      text: 'Hi Test User, thanks for reaching out to The Butterfly Cleaning! This is a test auto-reply to debug email delivery. If it\'s urgent, call us at (647) 327-5163.\n\n— The Butterfly Cleaning',
    });

    console.log('✅ Customer email sent successfully!');
    console.log('Email ID:', customerResult.data?.id);

    console.log('\n✅ All tests passed! Check your inboxes.');
    console.log('\n📋 Next steps:');
    console.log('1. Check spam/junk folders');
    console.log('2. Verify domain is properly set up in Resend dashboard');
    console.log('3. Check Resend logs for delivery status');

  } catch (error) {
    console.error('\n❌ Email test failed:', error);
    
    if (error.message?.includes('domain')) {
      console.log('\n💡 Domain issue detected. Make sure:');
      console.log('1. Domain is verified in Resend dashboard');
      console.log('2. DNS records are properly configured');
      console.log('3. RESEND_FROM uses the verified domain');
    }
  }
}

testEmails().catch(console.error);
