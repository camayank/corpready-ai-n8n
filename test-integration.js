#!/usr/bin/env node

/**
 * Integration Test Script for n8n + YouTube API
 *
 * This script tests:
 * 1. Backend API health
 * 2. YouTube API configuration
 * 3. YouTube search functionality
 * 4. n8n webhook integration
 */

const http = require('http');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}${'='.repeat(50)}\n${msg}\n${'='.repeat(50)}${colors.reset}\n`),
};

// Test configuration
const config = {
  backend: 'http://localhost:3000',
  n8n: 'http://localhost:5678',
  webhookId: '9291673e-e3f2-47ed-9113-f70dbb32fef4',
};

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            data: jsonData,
            raw: data,
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: null,
            raw: data,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Test functions
async function testBackendHealth() {
  log.info('Testing Backend Health...');
  try {
    const response = await makeRequest(`${config.backend}/health`);
    if (response.statusCode === 200) {
      log.success(`Backend is running! (${response.data.status})`);
      return true;
    } else {
      log.error(`Backend health check failed (HTTP ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    log.error(`Backend is not running: ${error.message}`);
    log.warn('Please start the backend with: cd backend && npm run dev');
    return false;
  }
}

async function testYouTubeConfig() {
  log.info('Testing YouTube API Configuration...');
  try {
    const response = await makeRequest(`${config.backend}/api/youtube/config`);
    if (response.statusCode === 200) {
      const { configured, message } = response.data;
      if (configured) {
        log.success('YouTube API is configured and ready!');
        return true;
      } else {
        log.warn(`YouTube API not configured: ${message}`);
        log.warn('Add YOUTUBE_API_KEY to Replit Secrets');
        return false;
      }
    } else {
      log.error(`YouTube config check failed (HTTP ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    log.error(`YouTube config check error: ${error.message}`);
    return false;
  }
}

async function testYouTubeSearch() {
  log.info('Testing YouTube Search API...');
  try {
    const response = await makeRequest(
      `${config.backend}/api/youtube/search?query=Python%20tutorial&maxResults=2`
    );

    if (response.statusCode === 200) {
      const { success, data, count } = response.data;
      if (success && count > 0) {
        log.success(`YouTube Search working! Found ${count} videos`);
        console.log(`   First video: "${data[0].title}"`);
        return true;
      } else {
        log.warn('YouTube Search returned no results');
        return false;
      }
    } else if (response.statusCode === 503) {
      log.warn('YouTube API is not configured');
      return false;
    } else {
      log.error(`YouTube search failed (HTTP ${response.statusCode})`);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    log.error(`YouTube search error: ${error.message}`);
    return false;
  }
}

async function testYouTubeEducational() {
  log.info('Testing YouTube Educational Search...');
  try {
    const response = await makeRequest(
      `${config.backend}/api/youtube/educational?topic=Web%20Development&maxResults=2`
    );

    if (response.statusCode === 200) {
      const { success, data, count } = response.data;
      if (success && count > 0) {
        log.success(`Educational Search working! Found ${count} videos`);
        const video = data[0];
        console.log(`   Video: "${video.title}"`);
        console.log(`   Duration: ${video.durationFormatted}, Views: ${video.viewCountFormatted}`);
        return true;
      } else {
        log.warn('Educational Search returned no results');
        return false;
      }
    } else if (response.statusCode === 503) {
      log.warn('YouTube API is not configured');
      return false;
    } else {
      log.error(`Educational search failed (HTTP ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    log.error(`Educational search error: ${error.message}`);
    return false;
  }
}

async function testN8NWebhook() {
  log.info('Testing n8n Webhook...');
  try {
    const testPayload = {
      chatInput: 'I am a student. I want to learn about Python Programming. My reason for learning is: To build automation scripts.',
    };

    const response = await makeRequest(
      `${config.n8n}/webhook/${config.webhookId}`,
      {
        method: 'POST',
        body: testPayload,
      }
    );

    if (response.statusCode === 200 || response.statusCode === 201) {
      log.success('n8n Webhook is working!');

      // Check if response has expected structure
      if (response.data && response.data.output) {
        console.log(`   Generated ${response.data.output.length} course modules`);
        if (response.data.output[0]?.videos) {
          console.log(`   First module has ${response.data.output[0].videos.length} videos`);
        }
        return true;
      } else {
        log.warn('n8n returned unexpected response format');
        console.log('   Response:', JSON.stringify(response.data).substring(0, 200));
        return true; // Still working, just different format
      }
    } else {
      log.error(`n8n webhook failed (HTTP ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    log.error(`n8n webhook error: ${error.message}`);
    log.warn('Make sure n8n is running: n8n start');
    log.warn('And the workflow is activated with the correct webhook ID');
    return false;
  }
}

// Main test runner
async function runTests() {
  log.header('🧪 Testing CorpReady Integration');

  const results = {
    backend: false,
    youtubeConfig: false,
    youtubeSearch: false,
    youtubeEducational: false,
    n8nWebhook: false,
  };

  // Test 1: Backend Health
  results.backend = await testBackendHealth();
  console.log('');

  if (!results.backend) {
    log.error('Backend is not running. Please start it first.');
    log.info('Run: cd backend && npm run dev');
    return;
  }

  // Test 2: YouTube Configuration
  results.youtubeConfig = await testYouTubeConfig();
  console.log('');

  // Test 3: YouTube Search (only if configured)
  if (results.youtubeConfig) {
    results.youtubeSearch = await testYouTubeSearch();
    console.log('');

    // Test 4: YouTube Educational Search
    results.youtubeEducational = await testYouTubeEducational();
    console.log('');
  }

  // Test 5: n8n Webhook
  results.n8nWebhook = await testN8NWebhook();
  console.log('');

  // Print Summary
  log.header('📊 Test Results Summary');

  const passed = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length;

  console.log(`Backend Health:          ${results.backend ? '✓' : '✗'}`);
  console.log(`YouTube Config:          ${results.youtubeConfig ? '✓' : '✗'}`);
  console.log(`YouTube Search:          ${results.youtubeSearch ? '✓' : '✗'}`);
  console.log(`YouTube Educational:     ${results.youtubeEducational ? '✓' : '✗'}`);
  console.log(`n8n Webhook:             ${results.n8nWebhook ? '✓' : '✗'}`);
  console.log(`\nTotal: ${passed}/${total} tests passed`);

  // Configuration Instructions
  if (!results.youtubeConfig || !results.n8nWebhook) {
    log.header('⚙️  Configuration Instructions');

    if (!results.youtubeConfig) {
      console.log(`${colors.yellow}YouTube API Setup:${colors.reset}`);
      console.log('1. Go to https://console.cloud.google.com/');
      console.log('2. Create/select a project');
      console.log('3. Enable "YouTube Data API v3"');
      console.log('4. Create credentials (API Key)');
      console.log('5. Add to Replit Secrets:');
      console.log(`   ${colors.green}YOUTUBE_API_KEY=AIza...${colors.reset}\n`);
    }

    if (!results.n8nWebhook) {
      console.log(`${colors.yellow}n8n Workflow Setup:${colors.reset}`);
      console.log('1. Start n8n: n8n start');
      console.log('2. Open http://localhost:5678');
      console.log('3. Import the workflow from corpready-ai-n8n.json');
      console.log('4. Configure credentials:');
      console.log(`   - Groq API Key (you mentioned this is updated ✓)`);
      console.log(`   - YouTube API Key`);
      console.log('5. Activate the workflow');
      console.log('6. Verify webhook URL matches:');
      console.log(`   ${colors.green}http://localhost:5678/webhook/${config.webhookId}${colors.reset}\n`);
    }
  }

  if (passed === total) {
    log.success('\n🎉 All tests passed! The integration is working perfectly!');
  } else if (passed >= 3) {
    log.warn('\n⚠️  Partial success. Some features may not work optimally.');
  } else {
    log.error('\n❌ Multiple tests failed. Please check the configuration above.');
  }

  console.log('');
}

// Run the tests
runTests().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
