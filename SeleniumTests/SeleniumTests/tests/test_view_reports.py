import time
from selenium.webdriver.common.by import By

def test_view_reports(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/login")

    driver.find_element(By.ID, "email").send_keys("teststudent@gmail.com")
    driver.find_element(By.ID, "password").send_keys("Test@123")
    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()
    time.sleep(2)

    # open PROFILE (2nd menu item)
    driver.find_element(By.CSS_SELECTOR, ".menu-item:nth-of-type(2)").click()
    time.sleep(2)

    # the actual correct expected URL
    assert "/user/reports" in driver.current_url
