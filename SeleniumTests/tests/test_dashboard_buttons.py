from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_dashboard_buttons(driver):
    wait = WebDriverWait(driver, 10)

    # 1️⃣ Login
    driver.get("https://online-quiz-portal-website.onrender.com/login")
    wait.until(EC.presence_of_element_located((By.ID, "email"))).send_keys("teststudent@gmail.com")
    driver.find_element(By.ID, "password").send_keys("Test@123")
    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()

    # 2️⃣ Navigate through menu items
    # Home (1st menu-item)
    home_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".menu-item:nth-of-type(1)")))
    home_btn.click()

    # Reports (2nd menu-item)
    reports_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".menu-item:nth-of-type(2)")))
    reports_btn.click()

    # Profile (3rd menu-item)
    profile_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".menu-item:nth-of-type(3)")))
    profile_btn.click()

    # Back to Home
    home_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".menu-item:nth-of-type(1)")))
    home_btn.click()

    # ✅ Verify we are on home page
    assert "/home" in driver.current_url.lower()
