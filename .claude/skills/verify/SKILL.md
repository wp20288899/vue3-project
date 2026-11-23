# /verify — 质量验收检查

触发场景：用户要求对当前改动做完整质量验收，或在提交前检查。

## 执行步骤

依次执行以下命令，每步均须实际运行并记录输出，不得跳过或伪造结果。

### 1. 格式化
```bash
pnpm format
```
若有文件被改动，说明格式不符合 Prettier 规范，属于正常自动修复。

### 2. 类型检查
```bash
pnpm type-check
```
零错误才算通过。若有错误，逐一修复后重跑。

### 3. ESLint
```bash
pnpm lint
```
零告警零错误才算通过。若有问题，先尝试：
```bash
pnpm lint:fix
```
无法自动修复的须手动处理。

### 4. 单元测试
```bash
pnpm test:unit -- run
```
输出须显示所有测试 passed，无 failed / skipped（除非有意跳过并已说明）。

### 5. 生产构建
```bash
pnpm build
```
须显示 `✓ built in ...`，无 error 输出。

### 6. 汇报格式
| 检查项 | 命令 | 结果 | 备注 |
|--------|------|------|------|
| 格式化 | `pnpm format` | ✅ / ⚠️ N 个文件被改动 | |
| 类型检查 | `pnpm type-check` | ✅ / ❌ | |
| ESLint | `pnpm lint` | ✅ / ❌ | |
| 单元测试 | `pnpm test:unit -- run` | ✅ N passed | |
| 构建 | `pnpm build` | ✅ / ❌ | |

所有项通过后，说明"可提交"；若有未通过项，列出具体错误和修复方案。
