# /commit — 生成 Git 提交信息

触发场景：用户要求提交当前改动。

## 执行步骤

### 1. 确认改动范围
先运行验收检查，确认代码可提交（见 `/verify`）。

查看改动文件：
```bash
git diff --stat HEAD
git status
```

### 2. 生成提交信息
遵循 Conventional Commits 规范：

```
<type>(<scope>): <subject>

[body — 可选，说明为什么这样改]

[footer — 可选，关联 issue / breaking change]
```

**type 选择：**
| type | 场景 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `refactor` | 重构（不改变功能） |
| `test` | 新增或修改测试 |
| `chore` | 构建、依赖、工程配置 |
| `docs` | 文档修改 |
| `style` | 仅格式化，不影响逻辑 |
| `perf` | 性能优化 |

**scope** 对应业务模块或目录：`api`、`router`、`store`、`components`、`views`、`utils`、`types`、`config` 等。

**subject** 中文或英文均可，不超过 72 字符，不加句号，动词开头（新增/修复/重构/优化）。

### 3. 提交（须用户授权后执行）
```bash
git add .
git commit -m "<生成的提交信息>"
```

> **重要**：未经用户明确确认，不执行 `git commit`、`git push` 或任何影响远程仓库的操作。

### 4. 交付格式
输出草拟的提交信息，等待用户确认后再执行。
