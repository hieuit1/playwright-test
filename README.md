# 🎭 Playwright TypeScript Automation Testing Boilerplate

Đây là bộ khung nền tảng (**Boilerplate Framework**) kiểm thử tự động End-to-End (E2E) chuyên nghiệp được xây dựng trên sự kết hợp giữa **Playwright** và **TypeScript**. Framework được thiết kế theo tiêu chuẩn doanh nghiệp, tối ưu cho việc tái sử dụng, dễ dàng mở rộng, hỗ trợ chạy trên nhiều môi trường khác nhau (**Multi-environment**), tích hợp sẵn CI/CD và cơ chế ngăn chặn Flaky Test thông minh.

---

## 🌟 Tính Năng Nổi Bật (Key Features)

*   **Cấu trúc Page Object Model (POM):** Phân tách rõ ràng giữa kịch bản kiểm thử (Tests) và đối tượng trang (Pages).
*   **Hỗ trợ Đa Môi Trường (Multi-environment configuration):** Tự động tải và áp dụng các cấu hình biến môi trường khác nhau (`dev`, `qa`, `staging`) thông qua các tệp cấu hình `.env.[môi_trường]`.
*   **Lá chắn Chống Flaky nâng cao (Anti-Flaky Shield):** Chặn quảng cáo, mã theo dõi bên thứ ba tự động ở cấp độ mạng (Network level) và DOM.
*   **Báo cáo Allure chuyên nghiệp (Allure Reports):** Tích hợp sẵn Allure report, hỗ trợ ghi nhận từng bước chạy chi tiết (`customStep`) và tự động chụp hình/quay phim khi lỗi xảy ra.
*   **Sẵn sàng cho CI/CD (CI/CD Ready):** Tích hợp GitHub Actions mạnh mẽ, hỗ trợ chạy song song phân mảnh (Sharding), gửi email báo cáo kết quả và tự động tải báo cáo lên GitHub Pages.

---

## 📁 Cấu Trúc Thư Mục Lõi (Core Architecture)

Cây thư mục của dự án được tổ chức khoa học để dễ dàng mở rộng và bảo trì:

```text
playwright-boilerplate/
├── .github/
│   └── workflows/
│       └── playwright-ci.yml   # Workflow GitHub Actions mẫu cho CI/CD (Dev, QA, Staging)
├── src/
│   ├── config/
│   │   ├── environment.ts      # Trình quản lý & cấu hình môi trường
│   │   ├── .env-example.dev    # Cấu hình mẫu môi trường Development
│   │   ├── .env-example.qa     # Cấu hình mẫu môi trường QA
│   │   └── .env-example.staging# Cấu hình mẫu môi trường Staging
│   ├── fixtures/
│   │   └── baseTest.ts         # Khởi tạo Fixtures cốt lõi & cơ chế AdBlocker chặn quảng cáo
│   ├── pages/
│   │   └── BasePage.ts         # Lớp cơ sở (Abstract Class) chứa các tương tác UI dùng chung
│   ├── test-data/
│   │   └── globalData.ts       # Nơi lưu trữ dữ liệu tĩnh toàn dự án
│   └── utils/
│       └── reportHelper.ts     # Trình trợ giúp tạo báo cáo Allure & tự động hóa screenshots
├── tests/
│   └── smoke/
│       └── healthCheck.spec.ts # Bộ kiểm thử kiểm tra độ ổn định của môi trường (Smoke Test)
├── .env                        # Tệp môi trường chung ở thư mục gốc (nếu có)
├── .gitignore                  # Bỏ qua tệp tin không cần thiết và thông tin nhạy cảm
├── package.json                # Quản lý thư viện phụ thuộc và định nghĩa Scripts chạy test
└── playwright.config.ts        # Tệp tin cấu hình trung tâm cho Playwright Engine
```

---

## 🛠️ Yêu Cầu Hệ Thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo hệ thống của bạn đã cài đặt:

*   **Node.js**: Phiên bản LTS khuyến nghị (từ `18.x.x` trở lên).
*   **NPM**: Trình quản lý gói đi kèm Node.js.
*   **Java Development Kit (JDK)**: Phiên bản `8` trở lên (bắt buộc để chạy cục bộ báo cáo **Allure Report**).

---

## 🚀 Hướng Dẫn Cài Đặt & Cấu Hình (Local Setup)

Hãy clone dự án về máy và thực thi các câu lệnh sau từ thư mục gốc của dự án:

### Bước 1: Cài đặt các gói thư viện
```bash
npm install
```
> [!NOTE]
> Khi chạy trên các môi trường CI/CD, khuyến nghị sử dụng lệnh `npm ci` để đảm bảo cài đặt chính xác các phiên bản thư viện đã khóa trong tệp `package-lock.json`.

### Bước 2: Cài đặt Browsers của Playwright
Playwright tải và quản lý các trình duyệt biệt lập. Hãy tải về các Engine (Chromium, Firefox, WebKit) và các thư viện hệ thống cần thiết bằng lệnh:
```bash
npx playwright install --with-deps
```

### Bước 3: Thiết lập biến môi trường cho từng môi trường chạy (.env)
Dự án hỗ trợ chạy trên nhiều môi trường khác nhau thông qua các tệp cấu hình riêng biệt trong thư mục [src/config/](./src/config/).

Từ các tệp ví dụ sẵn có, bạn hãy copy và đổi tên thành tệp cấu hình thực tế tương ứng:

1.  **Môi trường Development (dev):**
    *   Copy [src/config/.env-example.dev](./src/config/.env-example.dev) thành `src/config/.env.dev` và cập nhật thông tin:
    ```env
    BASE_URL=https://dev.link-cua-ban.com
    ```
2.  **Môi trường QA (qa):**
    *   Copy [src/config/.env-example.qa](./src/config/.env-example.qa) thành `src/config/.env.qa` và cập nhật thông tin:
    ```env
    BASE_URL=https://qa.your-future-project.com
    TEST_USER=qa_admin
    ```
3.  **Môi trường Staging (staging):**
    *   Copy [src/config/.env-example.staging](./src/config/.env-example.staging) thành `src/config/.env.staging` và cập nhật thông tin:
    ```env
    BASE_URL=https://staging.your-future-project.com
    ```

> [!WARNING]
> Không bao giờ đẩy các tệp chứa thông tin cấu hình thực tế hoặc nhạy cảm lên Git. Các tệp `.env.*` (như `.env.dev`, `.env.qa`, `.env.staging`) đã được cấu hình bỏ qua mặc định trong `.gitignore`.

---

## 🏃 Hướng Dẫn Thực Thi Kiểm Thử (Running Tests)

Bạn có thể chạy các kịch bản kiểm thử một cách linh hoạt bằng các câu lệnh dưới đây:

### 1. Chọn Môi trường Chạy (Environment Selection)

Để hệ thống tự động tải đúng cấu hình biến môi trường tương ứng (`dev`, `qa` hoặc `staging`), hãy thiết lập biến môi trường `ENV` trước khi thực thi:

*   **Chạy trên môi trường Development (`dev`):**
    ```bash
    # Windows (PowerShell)
    $env:ENV="dev"; npx playwright test
    
    # macOS/Linux (Bash)
    ENV=dev npx playwright test
    ```
*   **Chạy trên môi trường QA (`qa`):**
    ```bash
    # Windows (PowerShell)
    $env:ENV="qa"; npx playwright test
    
    # macOS/Linux (Bash)
    ENV=qa npx playwright test
    ```
*   **Chạy trên môi trường Staging (`staging`):**
    ```bash
    # Windows (PowerShell)
    $env:ENV="staging"; npx playwright test
    
    # macOS/Linux (Bash)
    ENV=staging npx playwright test
    ```

> [!TIP]
> Nếu bạn không thiết lập biến `ENV`, framework sẽ mặc định nhận cấu hình từ môi trường `qa`.

### 2. Các Chế độ hiển thị (Execution Modes)

| Câu lệnh | Mô tả |
| :--- | :--- |
| `npx playwright test` | Thực thi kiểm thử ở chế độ ẩn danh (**Headless mode** - tối ưu cho CI) |
| `npx playwright test --headed` | Thực thi kiểm thử có hiển thị trình duyệt (**Headed mode** - tối ưu khi gỡ lỗi) |
| `npx playwright test --ui` | Mở giao diện tương tác trực quan của Playwright UI Mode |

### 3. Lọc bài kiểm thử (Filtering & Tagging)

*   **Chạy toàn bộ test trong một thư mục chỉ định:**
    ```bash
    npx playwright test tests/
    ```
*   **Chạy bài kiểm thử chứa nhãn/tag chỉ định (Ví dụ `@smoke`):**
    ```bash
    npx playwright test --grep @smoke
    ```

---

## 📊 Báo Cáo Kiểm Thử Allure (Allure Reports)

Framework tích hợp sẵn trình báo cáo Allure Report với khả năng tùy biến cao. Để xem báo cáo một cách trực quan:

1.  **Tạo báo cáo chi tiết** từ kết quả thô sau khi hoàn thành chạy test:
    ```bash
    npx allure generate allure-results --clean -o allure-report
    ```
2.  **Khởi chạy máy chủ cục bộ** để xem trực tiếp báo cáo trên trình duyệt:
    ```bash
    npx allure open allure-report
    ```

---

## Hướng Dẫn Tùy Chỉnh & Cấu Hình CI/CD (`playwright-ci.yml`)

Để tích hợp chính xác hệ thống CI/CD từ file [.github/workflows/playwright-ci.yml](./.github/workflows/playwright-ci.yml) vào kho mã nguồn (Repository) của bạn, bạn cần thay đổi một số thông tin cấu hình dưới đây:

### 1. Cập nhật đường link báo cáo Allure (GitHub Pages)
Mặc định, link báo cáo được cấu hình cứng với tài khoản cũ. Hãy thay thế link GitHub Pages của bạn tại các dòng sau trong file `playwright-ci.yml`:
*   **Dòng 159 (Thông báo tóm tắt trên GitHub):**
    ```yaml
    # Thay đổi 'hieuit1/basecode-playwright-ts' thành '<username_cua_ban>/<ten_repo_cua_ban>'
    echo "| **Báo cáo Allure** | 👉 **[XEM BÁO CÁO TẠI ĐÂY](https://<username_cua_ban>.github.io/<ten_repo_cua_ban>/)** |" >> $GITHUB_STEP_SUMMARY
    ```
*   **Dòng 181 (Nội dung Email báo cáo):**
    ```yaml
    # Thay đổi link xem báo cáo Allure trong nội dung email
    https://<username_cua_ban>.github.io/<ten_repo_cua_ban>/
    ```

### 2. Thay đổi Email nhận báo cáo
*   **Dòng 188 (Địa chỉ email nhận kết quả):**
    ```yaml
    # Đổi 'bentakeu@gmail.com' thành địa chỉ email của bạn hoặc của dự án
    to: email_cua_ban@gmail.com
    ```

### 3. Cập nhật Tên dự án trong thông tin môi trường Allure
*   **Dòng 133 (Tên hiển thị dự án trong Allure):**
    ```yaml
    # Đổi 'basecode-playwright-ts' thành tên dự án thực tế của bạn
    Project: <ten_du_an_cua_ban>
    ```

### 4. Thiết lập GitHub Secrets & Variables (Quan trọng)
Để gửi email và quản lý biến môi trường thành công, bạn cần cài đặt các thông số sau trên GitHub Repository:
*   Vào **Settings** -> **Secrets and variables** -> **Actions** -> **Repository secrets** và thêm 2 Secrets:
    *   `EMAIL_USERNAME`: Địa chỉ Gmail dùng để gửi (ví dụ: `your-bot-mail@gmail.com`).
    *   `EMAIL_PASSWORD`: App Password (Mật khẩu ứng dụng) của Gmail đó (không phải mật khẩu đăng nhập thông thường).
*   Vào **Settings** -> **Environments**:
    *   Tạo 3 môi trường: `dev`, `qa`, và `staging`.
    *   Trong mỗi môi trường, tạo một Environment Variable (Biến môi trường) tên là `BASE_URL` và gán giá trị URL tương ứng của môi trường đó để Workflow tự động đọc qua cú pháp `${{ vars.BASE_URL }}` ở dòng 57.

---

## 🤖 Tích Hợp CI/CD (GitHub Actions)

Hệ thống CI/CD được thiết lập tự động trong [.github/workflows/playwright-ci.yml](./.github/workflows/playwright-ci.yml) với các tính năng vượt trội:

1.  **Kích hoạt linh hoạt (Trigger Sources):**
    *   Tự động chạy khi có `push` hoặc `pull_request` lên nhánh `main`, `master`.
    *   Chạy thủ công (**Workflow Dispatch**) cho phép lựa chọn Môi trường (`dev`, `qa`, `staging`) và Bộ Test (`@smoke`, `@regression`, `@e2e`).
    *   Kích hoạt qua API từ các dự án khác (**Repository Dispatch**) với các sự kiện `run-staging-tests`, `run-qa-tests`.
2.  **Chạy song song phân mảnh (Sharding):**
    *   Tự động chia nhỏ gói test thành 3 phần chạy song song (`shardIndex: [1, 2, 3]`) để tối ưu hóa thời gian thực thi.
3.  **Tự động công bố kết quả:**
    *   Hợp nhất kết quả từ các máy ảo song song và tạo Allure Report.
    *   Tải báo cáo lên **GitHub Pages** (nhánh `gh-pages`) và đính kèm đường dẫn xem trực tiếp vào phần Summary của Job chạy.
    *   Gửi email thông báo chi tiết kèm link báo cáo đến các địa chỉ email của team (SMTP Gmail).

---

## 💡 Best Practices & Quy Trình Viết Test Mới

Để duy trì chất lượng mã nguồn và tính ổn định cao nhất, vui lòng tuân thủ các nguyên tắc sau:

### 1. Kế thừa lớp cơ sở `BasePage`
Khi viết bất kỳ một Page Object mới nào, luôn thực hiện kế thừa từ [BasePage](./src/pages/BasePage.ts) để thừa hưởng các cơ chế tương tác UI an toàn (safe click, safe fill) có khả năng tự động chờ (auto-wait):
```typescript
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly emailInput = '#email';
  
  async login(email: string) {
    // Sử dụng hàm typeInto đã được bọc cơ chế xử lý an toàn từ BasePage
    await this.typeInto(this.emailInput, email);
  }
}
```

### 2. Sử dụng hàm bọc bước kiểm thử `customStep`
Bọc các bước xử lý logic kiểm thử trong hàm `customStep` được nhập từ [reportHelper.ts](./src/utils/reportHelper.ts). Điều này giúp trình báo cáo Allure phân đoạn các bước rõ ràng và tự động đính kèm ảnh chụp màn hình khi gặp lỗi mà không cần viết lại lệnh `page.screenshot()` thủ công:
```typescript
import { customStep } from "../../utils/reportHelper";

await customStep(page, "Bước 1: Nhập email người dùng", async () => {
  await loginPage.login("user@example.com");
});
```

### 3. Tận dụng lớp bảo vệ `Anti-Flaky Shield`
Khi viết các tệp kịch bản kiểm thử `.spec.ts`, hãy nhập đối tượng `test` và `expect` từ [baseTest.ts](./src/fixtures/baseTest.ts) thay vì thư viện gốc `@playwright/test`:
```typescript
// KHUYẾN NGHỊ:
import { test, expect } from "../../fixtures/baseTest";

// TRÁNH SỬ DỤNG:
// import { test, expect } from "@playwright/test";
```
> [!IMPORTANT]
> Lớp `baseTest.ts` chứa cơ chế ngăn chặn Flaky Test 2 lớp (cấp độ mạng và DOM), tự động chặn hoàn toàn các quảng cáo, iframe rác, và các đoạn mã theo dõi của bên thứ ba, từ đó giảm đáng kể thời gian chờ đợi vô ích và tăng tính ổn định của kịch bản kiểm thử lên mức tối đa.

---
*Chúc các bạn xây dựng những bộ kiểm thử tự động tin cậy và mượt mà!* 🚀